import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { Spinner } from '../../components/common'
import { Threads } from '../../components/messages'
import { useThreads } from '../../store'
import { MessagesParamList } from '.'

interface Props {
  navigation: StackNavigationProp<MessagesParamList, 'Messages'>
  route: RouteProp<MessagesParamList, 'Messages'>
}

export const Messages: FunctionComponent<Props> = () => {
  const [{ fetching, threads }, { fetchThreads }] = useThreads()

  useEffect(() => {
    fetchThreads()
  }, [fetchThreads])

  if (fetching) {
    return <Spinner />
  }

  return <Threads threads={threads} />
}
