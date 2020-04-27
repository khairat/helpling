import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import functions from '@react-native-firebase/functions'
import { cloneDeep } from 'lodash'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { helpers, mitter } from '../lib'
import {
  KindPluralType,
  KindType,
  RequestInputType,
  RequestType
} from '../types'

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

  unsubscribeFetchAll: () => void
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
  unsubscribeFetchAll: () => {},
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
      } = await functions().httpsCallable('acceptRequest')({
        id,
        kind
      })

      await dispatch(actions.fetchOne(kind, id))

      return threadId
    } catch ({ message }) {
      mitter.error(message)
    } finally {
      setState({
        accepting: false
      })
    }
  },
  cleanUpRequests: () => ({ getState, setState }: StoreApi) => {
    const { unsubscribeFetchAll } = getState()

    unsubscribeFetchAll()

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
      await functions().httpsCallable('completeRequest')({
        id,
        kind
      })

      await dispatch(actions.fetchOne(kind, id))
    } catch ({ message }) {
      mitter.error(message)
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
    getState().unsubscribeFetchAll()

    setState({
      fetching: true
    })

    const unsubscribeFetchAll = firestore()
      .collection(kind)
      .where('city', '==', city)
      .where('country', '==', country)
      .where('status', '==', 'pending')
      .orderBy('createdAt', 'desc')
      .limit(100)
      .onSnapshot(async ({ docs }) => {
        await helpers.fetchUsers(docs)

        const requests = docs.map((doc) => helpers.createRequest(doc))

        setState({
          fetching: false,
          [kind]: requests
        })
      })

    setState({
      unsubscribeFetchAll
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
