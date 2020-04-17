import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import functions from '@react-native-firebase/functions'
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
  offers: RequestType[]
  otherOffers: Record<string, RequestType>
  otherRequests: Record<string, RequestType>
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
  offers: [],
  otherOffers: {},
  otherRequests: {},
  removing: false,
  requests: [],
  unsubscribeFetchOffers: () => {},
  unsubscribeFetchRequests: () => {},
  updating: false
}

type StoreApi = StoreActionApi<State>

const actions = {
  acceptRequest: (kind: KindType, id: string) => async ({
    setState
  }: StoreApi) => {
    setState({
      accepting: true
    })

    try {
      const {
        data: { threadId }
      } = await functions().httpsCallable('accept')({
        id,
        kind
      })

      return threadId
    } catch ({ message }) {
      mitter.error(message)
    } finally {
      setState({
        accepting: false
      })
    }
  },
  cleanUpRequests: () => async ({ getState }: StoreApi) => {
    const { unsubscribeFetchOffers, unsubscribeFetchRequests } = getState()

    unsubscribeFetchOffers()
    unsubscribeFetchRequests()
  },
  completeRequest: (kind: KindType, id: string) => async ({
    setState
  }: StoreApi) => {
    setState({
      completing: true
    })

    try {
      await functions().httpsCallable('accept')({
        id,
        kind
      })
    } catch ({ message }) {
      mitter.error(message)
    } finally {
      setState({
        completing: false
      })
    }
  },
  createRequest: (kind: KindPluralType, data: RequestInputType) => async ({
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
  fetchOffer: (id: string) => async ({ getState, setState }: StoreApi) => {
    setState({
      fetching: true
    })

    const doc = await firestore().collection('offers').doc(id).get()

    if (doc.exists) {
      await helpers.fetchUsers([doc])

      const offer = helpers.createRequest(doc)

      const { otherOffers } = getState()

      setState({
        otherOffers: {
          ...otherOffers,
          [id]: offer
        }
      })
    }

    setState({
      fetching: false
    })
  },
  fetchOffers: () => async ({ setState }: StoreApi) => {
    setState({
      fetching: true
    })

    const unsubscribeFetchOffers = firestore()
      .collection('offers')
      .where('status', '==', 'pending')
      .orderBy('createdAt', 'desc')
      .onSnapshot(async ({ docs }) => {
        await helpers.fetchUsers(docs)

        const offers = docs.map((doc) => helpers.createRequest(doc))

        setState({
          fetching: false,
          offers
        })
      })

    setState({
      unsubscribeFetchOffers
    })
  },
  fetchRequest: (id: string) => async ({ getState, setState }: StoreApi) => {
    setState({
      fetching: true
    })

    const doc = await firestore().collection('requests').doc(id).get()

    if (doc.exists) {
      await helpers.fetchUsers([doc])

      const request = helpers.createRequest(doc)

      const { otherRequests } = getState()

      setState({
        otherRequests: {
          ...otherRequests,
          [id]: request
        }
      })
    }

    setState({
      fetching: false
    })
  },
  fetchRequests: () => async ({ setState }: StoreApi) => {
    setState({
      fetching: true
    })

    const unsubscribeFetchRequests = firestore()
      .collection('requests')
      .where('status', '==', 'pending')
      .orderBy('createdAt', 'desc')
      .onSnapshot(async ({ docs }) => {
        await helpers.fetchUsers(docs)

        const requests = docs.map((doc) => helpers.createRequest(doc))

        setState({
          fetching: false,
          requests
        })
      })

    setState({
      unsubscribeFetchRequests
    })
  },
  removeRequest: (kind: KindPluralType, id: string) => async ({
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
  updateRequest: (
    kind: KindPluralType,
    id: string,
    description: string
  ) => async ({ setState }: StoreApi) => {
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
