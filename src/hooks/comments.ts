import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useEffect, useRef, useState } from 'react'

import { helpers, mitter } from '../lib'
import { CommentType } from '../types'

export const useComments = (id: string) => {
  const unsubscribe = useRef<() => void>(() => {})

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
      .onSnapshot(
        async ({ docs }) => {
          await helpers.fetchUsers(docs)

          const comments = docs.map((doc) => helpers.createComment(doc))

          setComments(comments)
          setLoading(false)
        },
        () => {
          setLoading(false)

          mitter.error('Something went wrong. Please try again later.')

          // TODO: log to sentry
        }
      )
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
