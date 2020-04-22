import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useCallback, useEffect, useRef, useState } from 'react'

import { helpers, mitter } from '../lib'
import { CommentType, KindType } from '../types'

export const useComments = () => {
  const unsubscribe = useRef(() => {})

  const [creating, setCreating] = useState(false)
  const [fetching, setFetching] = useState(true)

  const [comments, setComments] = useState<CommentType[]>([])

  useEffect(() => {
    mitter.onSignOut(() => {
      unsubscribe.current()
    })
  }, [])

  const fetch = useCallback((id: string) => {
    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setFetching(true)

    unsubscribe.current = firestore()
      .collection('comments')
      .where('itemId', '==', id)
      .orderBy('createdAt', 'desc')
      .onSnapshot(async ({ docs }) => {
        await helpers.fetchUsers(docs)

        const comments = docs.map((doc) => helpers.createComment(doc))

        setComments(comments)
        setFetching(false)
      })
  }, [])

  const create = async (itemType: KindType, itemId: string, body: string) => {
    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setCreating(true)

    await firestore().collection('comments').add({
      body,
      createdAt: new Date(),
      itemId,
      itemType,
      userId: user.uid
    })

    setCreating(false)
  }

  return {
    comments,
    create,
    creating,
    fetch,
    fetching,
    unsubscribe: unsubscribe.current
  }
}
