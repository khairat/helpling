import firestore from '@react-native-firebase/firestore'
import { uniq } from 'lodash'

import { UserType } from '../types'

class Users {
  users = new Map<string, UserType>()

  get(id: string): UserType | undefined {
    return this.users.get(id)
  }

  async fetch(ids: string[]): Promise<void> {
    ids = ids.filter((id) => !this.users.get(id))

    const { docs } = await firestore()
      .collection('users')
      .where('id', 'in', uniq(ids))
      .get()

    docs.forEach((doc) =>
      this.users.set(doc.id, {
        id: doc.id,
        ...doc.data()
      } as UserType)
    )
  }
}

export const users = new Users()
