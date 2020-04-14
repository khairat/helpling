import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useEffect, useRef, useState } from 'react'

import { helpers, users } from '../lib'
import { RequestType } from '../types'

export const useRequests = (kind: 'offers' | 'requests') => {
  const unsubscribe = useRef<() => void>()

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<RequestType[]>([])

  useEffect(() => {
    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setLoading(true)

    unsubscribe.current = firestore()
      .collection(kind)
      // .where('status', '==', 'pending')
      // .where('userId', '>', user.uid)
      // .where('userId', '<', user.uid)
      // .orderBy('userId')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        async ({ docs }) => {
          const userIds: string[] = []

          docs.forEach((doc) => {
            const data = doc.data()

            if (!users.get(data.userId)) {
              userIds.push(data.userId)
            }

            if (data.helplingId && !users.get(data.helplingId)) {
              userIds.push(data.helplingId)
            }
          })

          if (userIds.length > 0) {
            await users.fetch(userIds)
          }

          const items = docs.map((doc) => helpers.createRequest(doc))

          setItems(items)
          setLoading(false)
        },
        (error) => {
          console.log(kind, error)
        }
      )
  }, [kind])

  return {
    items,
    loading,
    unsubscribe: unsubscribe.current
  }
}
