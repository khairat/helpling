import auth from '@react-native-firebase/auth'
import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore'
import { useEffect, useRef, useState } from 'react'

import { helpers } from '../lib'
import { MessageType } from '../types'

export const useThread = (id: string) => {
  const unsubscribe = useRef<() => void>(() => {})

  const [loading, setLoading] = useState(true)
  const [replying, setReplying] = useState(false)

  const [messages, setMessages] = useState<MessageType[]>([])

  useEffect(() => {
    setLoading(true)

    unsubscribe.current = firestore()
      .collection('messages')
      .where('threadId', '==', id)
      .orderBy('createdAt', 'desc')
      .onSnapshot(async ({ docs }: FirebaseFirestoreTypes.QuerySnapshot) => {
        await helpers.fetchUsers(docs)

        const messages = docs.map((doc) => helpers.createMessage(doc))

        setMessages(messages)
        setLoading(false)
      })
  }, [id])

  const reply = async (body: string) => {
    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setReplying(true)

    await firestore().collection('messages').add({
      body,
      createdAt: new Date(),
      threadId: id,
      userId: user.uid
    })

    setReplying(false)
  }

  return {
    loading,
    messages,
    reply,
    replying,
    unsubscribe: unsubscribe.current
  }
}
