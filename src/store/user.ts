import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { helpers } from '../lib'
import { RequestType, UserType } from '../types'

interface State {
  acceptedOffers: RequestType[]
  acceptedRequests: RequestType[]
  fetching: boolean
  loading: boolean
  offers: RequestType[]
  requests: RequestType[]
  user?: UserType

  unsubscribeFetchAcceptedOffers: () => void
  unsubscribeFetchAcceptedRequests: () => void
  unsubscribeFetchOffers: () => void
  unsubscribeFetchRequests: () => void
  unsubscribeFetchUser: () => void
}

const initialState: State = {
  acceptedOffers: [],
  acceptedRequests: [],
  fetching: false,
  loading: false,
  offers: [],
  requests: [],
  unsubscribeFetchAcceptedOffers: () => {},
  unsubscribeFetchAcceptedRequests: () => {},
  unsubscribeFetchOffers: () => {},
  unsubscribeFetchRequests: () => {},
  unsubscribeFetchUser: () => {},
  user: undefined
}

type StoreApi = StoreActionApi<State>

const actions = {
  cleanUpUser: () => ({ getState, setState }: StoreApi) => {
    const {
      unsubscribeFetchAcceptedOffers,
      unsubscribeFetchAcceptedRequests,
      unsubscribeFetchOffers,
      unsubscribeFetchRequests,
      unsubscribeFetchUser
    } = getState()

    unsubscribeFetchAcceptedOffers()
    unsubscribeFetchAcceptedRequests()
    unsubscribeFetchOffers()
    unsubscribeFetchRequests()
    unsubscribeFetchUser()

    setState(initialState)
  },
  fetchAcceptedOffers: () => ({ getState, setState }: StoreApi) => {
    getState().unsubscribeFetchAcceptedOffers()

    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setState({
      fetching: true
    })

    const { uid } = user

    const unsubscribeFetchAcceptedOffers = firestore()
      .collection('offers')
      .where('helplingId', '==', uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(async ({ docs }) => {
        await helpers.fetchUsers(docs)

        const acceptedOffers = docs.map((doc) => helpers.createRequest(doc))

        setState({
          acceptedOffers,
          fetching: false
        })
      })

    setState({
      unsubscribeFetchAcceptedOffers
    })
  },
  fetchAcceptedRequests: () => ({ getState, setState }: StoreApi) => {
    getState().unsubscribeFetchAcceptedRequests()

    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setState({
      fetching: true
    })

    const { uid } = user

    const unsubscribeFetchAcceptedRequests = firestore()
      .collection('requests')
      .where('helplingId', '==', uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(async ({ docs }) => {
        await helpers.fetchUsers(docs)

        const acceptedRequests = docs.map((doc) => helpers.createRequest(doc))

        setState({
          acceptedRequests,
          fetching: false
        })
      })

    setState({
      unsubscribeFetchAcceptedRequests
    })
  },
  fetchOffers: () => ({ getState, setState }: StoreApi) => {
    getState().unsubscribeFetchOffers()

    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setState({
      fetching: true
    })

    const { uid } = user

    const unsubscribeFetchOffers = firestore()
      .collection('offers')
      .where('userId', '==', uid)
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
  fetchRequests: () => ({ getState, setState }: StoreApi) => {
    getState().unsubscribeFetchRequests()

    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setState({
      fetching: true
    })

    const { uid } = user

    const unsubscribeFetchRequests = firestore()
      .collection('requests')
      .where('userId', '==', uid)
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
  fetchUser: () => ({ getState, setState }: StoreApi) => {
    getState().unsubscribeFetchUser()

    const user = auth().currentUser

    if (!user) {
      return
    }

    setState({
      loading: true
    })

    const { uid } = user

    const unsubscribeFetchUser = firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot((doc) => {
        if (doc?.exists) {
          const user = {
            ...doc.data(),
            id: uid
          } as UserType

          setState({
            user
          })
        } else {
          setState({
            user: undefined
          })
        }

        setState({
          loading: false
        })
      })

    setState({
      unsubscribeFetchUser
    })
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'user'
})

export const useUser = createHook(Store)
