import React, { FunctionComponent } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { useAuth } from '../../store'
import { colors, layout } from '../../styles'
import { MessageType } from '../../types'
import { Empty, Reply } from '../common'
import { Message } from './message'

interface Props {
  messages: MessageType[]
  replying: boolean

  onReply: (body: string) => void
}

export const Messages: FunctionComponent<Props> = ({
  messages,
  onReply,
  replying
}) => {
  const [{ user }] = useAuth()

  return (
    <>
      <FlatList
        contentContainerStyle={styles.list}
        data={messages}
        inverted
        ListEmptyComponent={
          <Empty icon="messages" inverted message="Be the first to say hi!" />
        }
        renderItem={({ item }) => <Message message={item} user={user} />}
        style={styles.main}
      />
      <Reply
        dismiss={false}
        loading={replying}
        onReply={(body) => onReply(body)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    paddingVertical: layout.padding
  },
  main: {
    backgroundColor: colors.backgroundDark
  }
})
