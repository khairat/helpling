import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { helpers } from '../lib'
import { ThreadType } from '../types'

interface State {
  threads: ThreadType[]
  fetching: boolean

  unsubscribeFetchThreads: () => void
}

const initialState: State = {
  fetching: false,
  threads: [],
  unsubscribeFetchThreads: () => {}
}

type StoreApi = StoreActionApi<State>

const actions = {
  cleanUpThreads: () => ({ getState, setState }: StoreApi) => {
    const { unsubscribeFetchThreads } = getState()

    unsubscribeFetchThreads()

    setState(initialState)
  },
  fetchThreads: () => ({ getState, setState }: StoreApi) => {
    getState().unsubscribeFetchThreads()

    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setState({
      fetching: true
    })

    const unsubscribeFetchThreads = firestore()
      .collection('threads')
      .where('userIds', 'array-contains', user.uid)
      .orderBy('updatedAt', 'desc')
      .onSnapshot(async ({ docs }) => {
        await helpers.fetchUsers(docs)

        const threads = docs.map((doc) => helpers.createThread(doc))

        setState({
          fetching: false,
          threads
        })
      })

    setState({
      unsubscribeFetchThreads
    })
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'threads'
})

export const useThreads = createHook(Store)
