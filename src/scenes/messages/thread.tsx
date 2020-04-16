import { RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { differenceBy } from 'lodash'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

import { img_ui_about } from '../../assets'
import { Header, HeaderButton, Spinner } from '../../components/common'
import { Messages } from '../../components/messages'
import { useThread } from '../../hooks'
import { helpers } from '../../lib'
import { useAuth } from '../../store'
import { colors, layout } from '../../styles'
import { MessagesParamList } from '.'

interface Props {
  navigation: StackNavigationProp<MessagesParamList, 'Thread'>
  route: RouteProp<MessagesParamList, 'Thread'>
}

export const Thread: FunctionComponent<Props> = ({
  navigation: { setOptions },
  route: {
    params: { thread }
  }
}) => {
  const { navigate } = useNavigation()

  const [{ user }] = useAuth()

  const [fetching, setFetching] = useState(false)

  const { loading, messages, reply, replying, unsubscribe } = useThread(
    thread.id
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => unsubscribe(), [])

  useEffect(() => {
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
            fetching ? (
              <ActivityIndicator color={colors.accent} style={styles.spinner} />
            ) : (
              <HeaderButton
                icon={img_ui_about}
                onPress={async () => {
                  setFetching(true)

                  const item = await helpers.fetchItem(itemType, itemId)

                  setFetching(false)

                  navigate(itemType === 'offer' ? 'Offers' : 'Requests')

                  // TODO: fix hack
                  setTimeout(() =>
                    navigate(itemType === 'offer' ? 'Offer' : 'Request', {
                      [itemType]: item
                    })
                  )
                }}
              />
            )
          }
        />
      ),
      title: other.name
    })
  }, [fetching, navigate, setOptions, thread, user])

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

const styles = StyleSheet.create({
  spinner: {
    margin: layout.margin
  }
})
