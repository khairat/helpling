import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useState } from 'react'

import { helpers } from '../lib'
import { RequestInputType } from '../types'

export const useActions = (kind: 'offers' | 'requests') => {
  const [creating, setCreating] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [updating, setUpdating] = useState(false)

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
        status: 'pending',
        updatedAt: new Date(),
        userId: user.uid
      })

    setCreating(false)

    const request = helpers.createRequest(await ref.get())

    return request
  }

  const update = async (id: string, description: string) => {
    setUpdating(true)

    await firestore().collection(kind).doc(id).update({
      description,
      updatedAt: new Date()
    })

    setUpdating(false)
  }

  const remove = async (id: string) => {
    setRemoving(true)

    await firestore().collection(kind).doc(id).delete()

    setRemoving(false)
  }

  return {
    create,
    creating,
    remove,
    removing,
    update,
    updating
  }
}
