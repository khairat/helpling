import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

import { notifications } from '../lib'
import { UserType } from '../types'

interface State {
  loading: boolean
  unloading: boolean
  user?: UserType

  unsubscribe?: () => void
}

const initialState: State = {
  loading: true,
  unloading: false
}

type StoreApi = StoreActionApi<State>

const actions = {
  destroy: () => async ({ getState }: StoreApi) => {
    const { unsubscribe } = getState()

    if (unsubscribe) {
      unsubscribe()
    }
  },
  init: () => async ({ setState }: StoreApi) => {
    const unsubscribeAuthStateChange = auth().onAuthStateChanged(
      async (user) => {
        if (user) {
          const { uid } = user

          notifications.subscribe(uid)

          const unsubscribeFetchUser = firestore()
            .collection('users')
            .doc(uid)
            .onSnapshot((doc) => {
              if (doc.exists) {
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
            unsubscribe: () => {
              unsubscribeAuthStateChange()
              unsubscribeFetchUser()
            }
          })
        } else {
          setState({
            loading: false
          })
        }
      }
    )

    setState({
      unsubscribe: unsubscribeAuthStateChange
    })
  },
  signOut: () => async ({ setState }: StoreApi) => {
    setState({
      unloading: true
    })

    const user = auth().currentUser

    if (user) {
      notifications.unsubscribe(user.uid)
    }

    await auth().signOut()

    setState({
      unloading: false
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
