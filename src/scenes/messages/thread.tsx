import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { differenceBy } from 'lodash'
import React, { FunctionComponent, useEffect } from 'react'

import { img_ui_about } from '../../assets'
import { Header, HeaderButton, Spinner } from '../../components/common'
import { Messages } from '../../components/messages'
import { nav } from '../../lib'
import { useMessages, useThreads, useUser } from '../../store'
import { MessagesParamList } from '.'

interface Props {
  navigation: StackNavigationProp<MessagesParamList, 'Thread'>
  route: RouteProp<MessagesParamList, 'Thread'>
}

export const Thread: FunctionComponent<Props> = ({
  navigation: { setOptions },
  route: {
    params: { id }
  }
}) => {
  const [
    { fetching, messages, replying },
    { cleanUpMessages, fetch, reply }
  ] = useMessages()
  const [{ threads }] = useThreads()
  const [{ user }] = useUser()

  useEffect(() => {
    fetch(id)

    return () => {
      cleanUpMessages()
    }
  }, [cleanUpMessages, fetch, id])

  useEffect(() => {
    const thread = threads.find((thread) => thread.id === id)

    if (!thread) {
      return
    }

    const { itemId, itemType, users } = thread

    const other = differenceBy(users, [user], 'id').pop()

    if (!other) {
      return
    }

    setOptions({
      header: (props) => (
        <Header
          {...props}
          right={
            <HeaderButton
              icon={img_ui_about}
              onPress={() =>
                nav.navigateAway(
                  itemType === 'offer' ? 'Offers' : 'Requests',
                  itemType === 'offer' ? 'Offer' : 'Request',
                  {
                    id: itemId
                  }
                )
              }
            />
          }
        />
      ),
      title: other.name
    })
  }, [id, setOptions, threads, user])

  if (fetching) {
    return <Spinner />
  }

  return (
    <Messages
      messages={messages}
      onReply={(body) => reply(id, body)}
      replying={replying}
    />
  )
}
