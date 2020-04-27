import '@react-native-firebase/functions'

import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { cloneDeep } from 'lodash'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { config, dialog, helpers } from '../lib'
import {
  KindPluralType,
  KindType,
  RequestInputType,
  RequestType
} from '../types'

const callable = (name: string) =>
  firebase.app().functions('europe-west2').httpsCallable(name)

interface State {
  accepting: boolean
  completing: boolean
  creating: boolean
  fetching: boolean
  fetchingOne: boolean
  offers: RequestType[]
  others: Record<string, RequestType>
  removing: boolean
  requests: RequestType[]
  updating: boolean

  unsubscribeFetchOffers: () => void
  unsubscribeFetchRequests: () => void
}

const initialState: State = {
  accepting: false,
  completing: false,
  creating: false,
  fetching: false,
  fetchingOne: false,
  offers: [],
  others: {},
  removing: false,
  requests: [],
  unsubscribeFetchOffers: () => {},
  unsubscribeFetchRequests: () => {},
  updating: false
}

type StoreApi = StoreActionApi<State>

const actions = {
  accept: (kind: KindType, id: string) => async ({
    dispatch,
    setState
  }: StoreApi) => {
    setState({
      accepting: true
    })

    try {
      const {
        data: { threadId }
      } = await callable('acceptRequest')({
        id,
        kind
      })

      await dispatch(actions.fetchOne(kind, id))

      return threadId
    } catch ({ message }) {
      dialog.error(message)
    } finally {
      setState({
        accepting: false
      })
    }
  },
  cleanUpRequests: () => ({ getState, setState }: StoreApi) => {
    const { unsubscribeFetchOffers, unsubscribeFetchRequests } = getState()

    unsubscribeFetchOffers()
    unsubscribeFetchRequests()

    setState(initialState)
  },
  complete: (kind: KindType, id: string) => async ({
    dispatch,
    setState
  }: StoreApi) => {
    setState({
      completing: true
    })

    try {
      await callable('completeRequest')({
        id,
        kind
      })

      await dispatch(actions.fetchOne(kind, id))
    } catch ({ message }) {
      dialog.error(message)
    } finally {
      setState({
        completing: false
      })
    }
  },
  create: (kind: KindPluralType, data: RequestInputType) => async ({
    setState
  }: StoreApi) => {
    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setState({
      creating: true
    })

    const { id } = await firestore()
      .collection(kind)
      .add({
        ...data,
        createdAt: new Date(),
        status: 'pending',
        updatedAt: new Date(),
        userId: user.uid
      })

    setState({
      creating: false
    })

    return id
  },
  fetchAll: (kind: KindPluralType, city: string, country: string) => ({
    getState,
    setState
  }: StoreApi) => {
    if (kind === 'offers') {
      getState().unsubscribeFetchOffers()
    } else {
      getState().unsubscribeFetchRequests()
    }

    setState({
      fetching: true
    })

    const onlyShowNearby = config.fetch('only_show_nearby') === 'enabled'
    const onlyShowPending = config.fetch('only_show_pending') === 'enabled'

    let query = firestore()
      .collection(kind)
      .orderBy('createdAt', 'desc')
      .limit(100)

    if (onlyShowNearby) {
      query = query.where('city', '==', city).where('country', '==', country)
    }

    if (onlyShowPending) {
      query = query.where('status', '==', 'pending')
    }

    const unsubscribe = query.onSnapshot(async ({ docs }) => {
      await helpers.fetchUsers(docs)

      const requests = docs.map((doc) => helpers.createRequest(doc))

      setState({
        fetching: false,
        [kind]: requests
      })
    })

    setState({
      [kind === 'offers'
        ? 'unsubscribeFetchOffers'
        : 'unsubscribeFetchRequests']: unsubscribe
    })
  },
  fetchOne: (kind: KindType, id: string) => async ({
    getState,
    setState
  }: StoreApi) => {
    setState({
      fetchingOne: true
    })

    const doc = await firestore()
      .collection(kind === 'offer' ? 'offers' : 'requests')
      .doc(id)
      .get()

    if (doc?.exists) {
      await helpers.fetchUsers([doc])

      const request = helpers.createRequest(doc)

      const { others } = getState()

      setState({
        others: {
          ...cloneDeep(others),
          [id]: request
        }
      })
    }

    setState({
      fetchingOne: false
    })
  },
  remove: (kind: KindPluralType, id: string) => async ({
    setState
  }: StoreApi) => {
    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setState({
      removing: true
    })

    const request = await firestore().collection(kind).doc(id).get()

    const data = request.data()

    if (data?.userId !== user.uid) {
      throw new Error(`Cannot remove someone else's ${kind.slice(0, -1)}`)
    }

    await firestore().collection(kind).doc(id).delete()

    setState({
      removing: false
    })
  },
  update: (kind: KindPluralType, id: string, description: string) => async ({
    dispatch,
    setState
  }: StoreApi) => {
    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setState({
      updating: true
    })

    const request = await firestore().collection(kind).doc(id).get()

    const data = request.data()

    if (data?.userId !== user.uid) {
      throw new Error(`Cannot update someone else's ${kind.slice(0, -1)}`)
    }

    await firestore().collection(kind).doc(id).update({
      description,
      updatedAt: new Date()
    })

    await dispatch(
      actions.fetchOne(kind === 'offers' ? 'offer' : 'request', id)
    )

    setState({
      updating: false
    })
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'requests'
})

export const useRequests = createHook(Store)
