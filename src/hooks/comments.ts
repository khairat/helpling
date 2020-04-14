import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useEffect, useState } from 'react'

import { helpers, users } from '../lib'
import { CommentType } from '../types'

export const useComments = (id: string) => {
  const [adding, setAdding] = useState(false)
  const [loading, setLoading] = useState(true)

  const [comments, setComments] = useState<CommentType[]>([])

  useEffect(() => {
    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setLoading(true)

    const unsubscribe = firestore()
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

    return () => unsubscribe()
  }, [id])

  const addComment = async (itemId: string, body: string) => {
    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setAdding(true)

    await firestore().collection('comments').add({
      body,
      createdAt: new Date(),
      itemId,
      userId: user.uid
    })

    setAdding(false)
  }

  return {
    addComment,
    adding,
    comments,
    loading
  }
}
