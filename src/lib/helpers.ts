import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

import { CommentType, RequestType } from '../types'
import { users } from './users'

class Helpers {
  async fetchUsers(
    docs: FirebaseFirestoreTypes.QueryDocumentSnapshot[]
  ): Promise<void> {
    const ids = docs.reduce<string[]>((ids, doc) => {
      const data = doc.data()

      if (!users.get(data.userId)) {
        ids.push(data.userId)
      }

      if (data.helplingId && !users.get(data.helplingId)) {
        ids.push(data.helplingId)
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
}

export const helpers = new Helpers()
