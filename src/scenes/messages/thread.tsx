import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { differenceBy } from 'lodash'
import React, { FunctionComponent, useEffect } from 'react'

import { img_ui_about } from '../../assets'
import { Header, HeaderButton, Spinner } from '../../components/common'
import { Messages } from '../../components/messages'
import { useMessages } from '../../hooks'
import { nav } from '../../lib'
import { useThreads, useUser } from '../../store'
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
  const [{ threads }] = useThreads()
  const [{ user }] = useUser()

  const { loading, messages, reply, replying, unsubscribe } = useMessages(id)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => unsubscribe(), [])

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
