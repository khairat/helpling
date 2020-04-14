import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useState } from 'react'

import { helpers } from '../lib'
import { RequestInputType } from '../types'

export const useActions = () => {
  const [creatingRequest, setCreatingRequest] = useState(false)

  const createRequest = async (data: RequestInputType) => {
    const user = auth().currentUser

    if (!user) {
      return
    }

    setCreatingRequest(true)

    const ref = await firestore()
      .collection('requests')
      .add({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.uid
      })

    setCreatingRequest(false)

    const request = helpers.createRequest(await ref.get())

    return request
  }

  return {
    createRequest,
    creatingRequest
  }
}
