import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

import { CommentType, RequestType } from '../types'
import { users } from './users'

class Helpers {
  createRequest(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot
  ): RequestType {
    const data = doc.data()

    return {
      ...data,
      helpling: data.helplingId ?? users.get(data.helplingId),
      id: doc.id,
      user: users.get(data.userId)
    } as RequestType
  }

  createComment(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot
  ): CommentType {
    const data = doc.data()

    return {
      ...data,
      id: doc.id,
      user: users.get(data.userId)
    } as CommentType
  }
}

export const helpers = new Helpers()
