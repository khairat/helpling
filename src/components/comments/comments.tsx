import React, { FunctionComponent, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { useComments } from '../../hooks'
import { colors, layout, typography } from '../../styles'
import { Empty, Reply, Spinner } from '../common'
import { Comment } from './comment'

interface Props {
  itemId: string
}

export const Comments: FunctionComponent<Props> = ({ itemId }) => {
  const {
    comments,
    createComment,
    creating,
    loading,
    unsubscribe
  } = useComments(itemId)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => unsubscribe(), [])

  if (loading) {
    return <Spinner style={styles.main} />
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Comments ({comments.length})</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.list}
        data={comments}
        inverted
        ListEmptyComponent={
          <Empty
            inverted
            message={'No comments yet.\nBe the first to write one.'}
          />
        }
        renderItem={({ item }) => <Comment item={item} />}
        style={styles.main}
      />
      <Reply
        loading={creating}
        onReply={(body) => createComment(itemId, body)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.backgroundDark,
    padding: layout.margin
  },
  list: {
    flexGrow: 1,
    paddingVertical: layout.padding
  },
  main: {
    backgroundColor: colors.backgroundDark
  },
  title: {
    ...typography.regular,
    ...typography.medium,
    color: colors.foreground
  }
})
