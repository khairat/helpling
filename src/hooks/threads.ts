import auth from '@react-native-firebase/auth'
import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore'
import { useEffect, useRef, useState } from 'react'

import { helpers } from '../lib'
import { ThreadType } from '../types'

export const useThreads = () => {
  const unsubscribe = useRef<() => void>(() => {})

  const [loading, setLoading] = useState(true)
  const [threads, setThreads] = useState<ThreadType[]>([])

  useEffect(() => {
    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setLoading(true)

    unsubscribe.current = firestore()
      .collection('threads')
      .where('userIds', 'array-contains', user.uid)
      .orderBy('updatedAt', 'desc')
      .onSnapshot(
        async ({ docs }: FirebaseFirestoreTypes.QuerySnapshot) => {
          await helpers.fetchUsers(docs)

          const threads = docs.map((doc) => helpers.createThread(doc))

          setThreads(threads)
          setLoading(false)
        },
        (error) => console.log('error', error)
      )
  }, [])

  return {
    loading,
    threads,
    unsubscribe: unsubscribe.current
  }
}
