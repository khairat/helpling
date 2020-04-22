import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { helpers } from '../lib'
import { KindPluralType, RequestType, UserType } from '../types'

interface State {
  acceptedOffers: RequestType[]
  acceptedRequests: RequestType[]
  fetching: boolean
  loading: boolean
  offers: RequestType[]
  requests: RequestType[]
  user?: UserType

  unsubscribeFetchRequests: () => void
  unsubscribeFetchAcceptedRequests: () => void
  unsubscribeFetchUser: () => void
}

const initialState: State = {
  acceptedOffers: [],
  acceptedRequests: [],
  fetching: false,
  loading: false,
  offers: [],
  requests: [],
  unsubscribeFetchAcceptedRequests: () => {},
  unsubscribeFetchRequests: () => {},
  unsubscribeFetchUser: () => {},
  user: undefined
}

type StoreApi = StoreActionApi<State>

const actions = {
  cleanUpUser: () => ({ getState, setState }: StoreApi) => {
    const {
      unsubscribeFetchAcceptedRequests,
      unsubscribeFetchRequests,
      unsubscribeFetchUser
    } = getState()

    unsubscribeFetchAcceptedRequests()
    unsubscribeFetchRequests()
    unsubscribeFetchUser()

    setState(initialState)
  },
  fetchAcceptedRequests: (kind: KindPluralType) => ({
    getState,
    setState
  }: StoreApi) => {
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
      .collection(kind)
      .where('helplingId', '==', uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(async ({ docs }) => {
        await helpers.fetchUsers(docs)

        const requests = docs.map((doc) => helpers.createRequest(doc))

        setState({
          [kind === 'offers' ? 'acceptedOffers' : 'acceptetRequests']: requests,
          fetching: false
        })
      })

    setState({
      unsubscribeFetchAcceptedRequests
    })
  },
  fetchRequests: (kind: KindPluralType) => ({
    getState,
    setState
  }: StoreApi) => {
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
      .collection(kind)
      .where('userId', '==', uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(async ({ docs }) => {
        await helpers.fetchUsers(docs)

        const requests = docs.map((doc) => helpers.createRequest(doc))

        setState({
          fetching: false,
          [kind]: requests
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
