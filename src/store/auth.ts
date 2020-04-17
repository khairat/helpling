import auth from '@react-native-firebase/auth'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { notifications } from '../lib'

interface State {
  initialising: boolean
  signedIn: boolean
  signingOut: boolean

  unsubscribe: () => void
}

const initialState: State = {
  initialising: true,
  signedIn: false,
  signingOut: false,
  unsubscribe: () => {}
}

type StoreApi = StoreActionApi<State>

const actions = {
  cleanUpAuth: () => ({ getState, setState }: StoreApi) => {
    const { unsubscribe } = getState()

    unsubscribe()

    setState(initialState)
  },
  initialise: () => ({ setState }: StoreApi) => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const { uid } = user

        notifications.subscribeToTopic(uid)
      }

      setState({
        initialising: false,
        signedIn: !!user
      })
    })

    setState({
      unsubscribe
    })
  },
  signOut: () => async ({ setState }: StoreApi) => {
    setState({
      signingOut: true
    })

    const user = auth().currentUser

    if (user) {
      notifications.unsubscribeFromTopic(user.uid)
    }

    await auth().signOut()

    setState({
      signingOut: false
    })
  }
}

type Actions = typeof actions

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'auth'
})

export const useAuth = createHook(Store)
