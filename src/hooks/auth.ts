import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useEffect, useState } from 'react'

import { User } from '../types'

let unsubscribeAuthStateChange: () => void
let unsubscribeFetchUser: () => void

export const useAuth = (init = false) => {
  const [loading, setLoading] = useState(init)
  const [unloading, setUnloading] = useState(false)

  const [user, setUser] = useState<User>()

  useEffect(() => {
    unsubscribeAuthStateChange = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const { uid } = user

        unsubscribeFetchUser = firestore()
          .collection('users')
          .doc(uid)
          .onSnapshot((document) => {
            if (document.exists) {
              console.log('user', {
                ...document.data(),
                id: uid
              })

              setUser({
                ...document.data(),
                id: uid
              } as User)
            } else {
              setUser(undefined)
            }

            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    })

    return () => {
      if (unsubscribeAuthStateChange) {
        unsubscribeAuthStateChange()
      }

      if (unsubscribeFetchUser) {
        unsubscribeFetchUser()
      }
    }
  }, [])

  const signOut = async () => {
    setUnloading(true)

    await auth().signOut()

    setUnloading(false)
  }

  return {
    loading,
    signOut,
    unloading,
    user
  }
}
