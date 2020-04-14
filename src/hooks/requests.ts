import firestore from '@react-native-firebase/firestore'
import { uniq } from 'lodash'
import { useEffect, useState } from 'react'

import { Request, User } from '../types'

const users = new Map<string, User>()

export const useRequests = () => {
  const [loading, setLoading] = useState(true)

  const [requests, setRequests] = useState<Request[]>([])

  useEffect(() => {
    setLoading(true)

    const unsubscribe = firestore()
      .collection('requests')
      .orderBy('createdAt', 'desc')
      // .where('status', '==', 'pending')
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

        if (uniq(userIds).length > 0) {
          const { docs } = await firestore()
            .collection('users')
            .where('id', 'in', uniq(userIds))
            .get()

          docs.forEach((doc) =>
            users.set(doc.id, {
              id: doc.id,
              ...doc.data()
            } as User)
          )
        }

        const _requests = docs.map((doc) => {
          const data = doc.data()

          return {
            ...data,
            helpling: data.helplingId ?? users.get(data.helplingId),
            id: doc.id,
            user: users.get(data.userId)
          }
        }) as Request[]

        setRequests(_requests)

        setLoading(false)
      })

    return () => unsubscribe()
  }, [])

  return {
    loading,
    requests
  }
}
