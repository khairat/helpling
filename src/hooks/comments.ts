import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useEffect, useRef, useState } from 'react'

import { helpers, users } from '../lib'
import { CommentType } from '../types'

export const useComments = (id: string) => {
  const unsubscribe = useRef<() => void>()

  const [creating, setCreating] = useState(false)
  const [loading, setLoading] = useState(true)

  const [comments, setComments] = useState<CommentType[]>([])

  useEffect(() => {
    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setLoading(true)

    unsubscribe.current = firestore()
      .collection('comments')
      .where('itemId', '==', id)
      .orderBy('createdAt', 'desc')
      .onSnapshot(async ({ docs }) => {
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

        const comments = docs.map((doc) => helpers.createComment(doc))

        setComments(comments)
        setLoading(false)
      })
  }, [id])

  const createComment = async (itemId: string, body: string) => {
    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setCreating(true)

    await firestore().collection('comments').add({
      body,
      createdAt: new Date(),
      itemId,
      userId: user.uid
    })

    setCreating(false)
  }

  return {
    comments,
    createComment,
    creating,
    loading,
    unsubscribe: unsubscribe.current
  }
}
