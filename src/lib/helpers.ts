import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

import { CommentType, MessageType, RequestType, ThreadType } from '../types'
import { users } from './users'

class Helpers {
  async fetchUsers(
    docs: FirebaseFirestoreTypes.QueryDocumentSnapshot[]
  ): Promise<void> {
    const ids = docs.reduce<string[]>((ids, doc) => {
      const data = doc.data()

      if (data.userId && !users.get(data.userId)) {
        ids.push(data.userId)
      }

      if (data.helplingId && !users.get(data.helplingId)) {
        ids.push(data.helplingId)
      }

      if (data.userIds) {
        data.userIds.forEach((id: string) => {
          if (!users.get(id)) {
            ids.push(id)
          }
        })
      }

      return ids
    }, [])

    if (ids.length > 0) {
      await users.fetch(ids)
    }
  }

  createRequest(
    doc:
      | FirebaseFirestoreTypes.QueryDocumentSnapshot
      | FirebaseFirestoreTypes.DocumentSnapshot
  ): RequestType {
    const data = doc.data()

    if (!data) {
      throw new Error('No data found')
    }

    return {
      ...data,
      createdAt: data.createdAt.toDate().toISOString(),
      helpling: data.helplingId ?? users.get(data.helplingId),
      id: doc.id,
      updatedAt: data.updatedAt.toDate().toISOString(),
      user: users.get(data.userId)
    } as RequestType
  }

  createComment(
    doc:
      | FirebaseFirestoreTypes.QueryDocumentSnapshot
      | FirebaseFirestoreTypes.DocumentSnapshot
  ): CommentType {
    const data = doc.data()

    if (!data) {
      throw new Error('No data found')
    }

    return {
      ...data,
      createdAt: data.createdAt.toDate().toISOString(),
      id: doc.id,
      user: users.get(data.userId)
    } as CommentType
  }

  createThread(
    doc:
      | FirebaseFirestoreTypes.QueryDocumentSnapshot
      | FirebaseFirestoreTypes.DocumentSnapshot
  ): ThreadType {
    const data = doc.data()

    if (!data) {
      throw new Error('No data found')
    }

    return {
      ...data,
      createdAt: data.createdAt.toDate().toISOString(),
      id: doc.id,
      updatedAt: data.updatedAt.toDate().toISOString(),
      users: data.userIds.map((id: string) => users.get(id))
    } as ThreadType
  }

  createMessage(
    doc:
      | FirebaseFirestoreTypes.QueryDocumentSnapshot
      | FirebaseFirestoreTypes.DocumentSnapshot
  ): MessageType {
    const data = doc.data()

    if (!data) {
      throw new Error('No data found')
    }

    return {
      ...data,
      createdAt: data.createdAt.toDate().toISOString(),
      id: doc.id,
      user: users.get(data.userId)
    } as MessageType
  }
}

export const helpers = new Helpers()
