import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { Spinner } from '../../components/common'
import { Messages } from '../../components/messages'
import { useThread } from '../../hooks'
import { MessagesParamList } from '.'

interface Props {
  navigation: StackNavigationProp<MessagesParamList, 'Thread'>
  route: RouteProp<MessagesParamList, 'Thread'>
}

export const Thread: FunctionComponent<Props> = ({
  route: {
    params: { id }
  }
}) => {
  const { loading, messages, reply, replying, unsubscribe } = useThread(id)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => unsubscribe(), [])

  if (loading) {
    return <Spinner />
  }

  return (
    <Messages
      messages={messages}
      onReply={(body) => reply(body)}
      replying={replying}
    />
  )
}
