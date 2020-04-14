import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useEffect, useState } from 'react'

import { users } from '../lib'
import { RequestType } from '../types'

export const useRequests = () => {
  const [loading, setLoading] = useState(true)

  const [requests, setRequests] = useState<RequestType[]>([])

  useEffect(() => {
    setLoading(true)

    const user = auth().currentUser

    if (!user) {
      setLoading(false)

      return
    }

    const unsubscribe = firestore()
      .collection('requests')
      // .where('status', '==', 'pending')
      // .where('userId', '>', user.uid)
      // .where('userId', '<', user.uid)
      // .orderBy('userId')
      .orderBy('createdAt', 'desc')
      .onSnapshot(async ({ docs }) => {
        const userIds: string[] = []

        docs.forEach((doc) => {
          const data = doc.data()

          if (!users.get(data.userId)) {
            userIds.push(data.userId)
          }

          if (!users.get(data.helplingId) && data.helplingId) {
            userIds.push(data.helplingId)
          }
        })

        if (userIds.length > 0) {
          await users.fetch(userIds)
        }

        const requests = docs.map((doc) => {
          const data = doc.data()

          return {
            ...data,
            helpling: data.helplingId ?? users.get(data.helplingId),
            id: doc.id,
            user: users.get(data.userId)
          }
        }) as RequestType[]

        setRequests(requests)
        setLoading(false)
      })

    return () => unsubscribe()
  }, [])

  return {
    loading,
    requests
  }
}
