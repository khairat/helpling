import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { Spinner } from '../../components/common'
import { Threads } from '../../components/messages'
import { useThreads } from '../../hooks'
import { MessagesParamList } from '.'

interface Props {
  navigation: StackNavigationProp<MessagesParamList, 'Messages'>
  route: RouteProp<MessagesParamList, 'Messages'>
}

export const Messages: FunctionComponent<Props> = () => {
  const { loading, threads, unsubscribe } = useThreads()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => unsubscribe(), [])

  if (loading) {
    return <Spinner />
  }

  return <Threads threads={threads} />
}
