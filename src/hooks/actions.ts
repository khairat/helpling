import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useState } from 'react'

import { helpers } from '../lib'
import { RequestInputType } from '../types'

export const useActions = (kind: 'offers' | 'requests') => {
  const [creating, setCreating] = useState(false)

  const create = async (data: RequestInputType) => {
    const user = auth().currentUser

    if (!user) {
      throw new Error('User not found')
    }

    setCreating(true)

    const ref = await firestore()
      .collection(kind)
      .add({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.uid
      })

    setCreating(false)

    const request = helpers.createRequest(await ref.get())

    return request
  }

  return {
    create,
    creating
  }
}
