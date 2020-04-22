import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { helpers } from '../lib'
import { MessageType } from '../types'

interface State {
  fetching: boolean
  messages: MessageType[]
  replying: boolean

  unsubscribeFetch: () => void
}

const initialState: State = {
  fetching: false,
  messages: [],
  replying: false,
  unsubscribeFetch: () => {}
}

type StoreApi = StoreActionApi<State>

const actions = {
  cleanUpMessages: () => ({ getState, setState }: StoreApi) => {
    const { unsubscribeFetch } = getState()

    unsubscribeFetch()

    setState(initialState)
  },
  fetch: (threadId: string) => ({ getState, setState }: StoreApi) => {
    getState().unsubscribeFetch()

    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setState({
      fetching: true
    })

    const unsubscribeFetch = firestore()
      .collection('messages')
      .where('threadId', '==', threadId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(async ({ docs }) => {
        await helpers.fetchUsers(docs)

        const messages = docs.map((doc) => helpers.createMessage(doc))

        setState({
          fetching: false,
          messages
        })
      })

    setState({
      unsubscribeFetch
    })
  },
  reply: (threadId: string, body: string) => async ({ setState }: StoreApi) => {
    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setState({
      replying: true
    })

    await firestore().collection('messages').add({
      body,
      createdAt: new Date(),
      threadId,
      userId: user.uid
    })

    setState({
      replying: false
    })
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'messages'
})

export const useMessages = createHook(Store)
