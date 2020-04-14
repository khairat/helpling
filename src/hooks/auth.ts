import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useEffect, useRef, useState } from 'react'

import { UserType } from '../types'

export const useAuth = (init = false) => {
  const unsubscribe = useRef<() => void>()

  const [loading, setLoading] = useState(init)
  const [unloading, setUnloading] = useState(false)

  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    const unsubscribeAuthStateChange = auth().onAuthStateChanged(
      async (user) => {
        if (user) {
          const { uid } = user

          const unsubscribeFetchUser = firestore()
            .collection('users')
            .doc(uid)
            .onSnapshot((doc) => {
              if (doc.exists) {
                const user = {
                  ...doc.data(),
                  id: uid
                } as UserType

                setUser(user)
              } else {
                setUser(undefined)
              }

              setLoading(false)
            })

          unsubscribe.current = () => {
            unsubscribeAuthStateChange()
            unsubscribeFetchUser()
          }
        } else {
          setLoading(false)
        }
      }
    )

    unsubscribe.current = unsubscribeAuthStateChange
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
    unsubscribe: unsubscribe.current,
    user
  }
}
