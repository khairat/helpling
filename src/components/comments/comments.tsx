import React, { FunctionComponent, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { useComments } from '../../hooks'
import { colors, layout, typography } from '../../styles'
import { Spinner } from '../common'
import { AddComment } from './add-comment'
import { Comment } from './comment'
import { Empty } from './empty'

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

  useEffect(
    () => () => {
      if (unsubscribe) {
        unsubscribe()
      }
    },
    [unsubscribe]
  )

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
        ListEmptyComponent={Empty}
        renderItem={({ item }) => <Comment item={item} />}
        style={styles.main}
      />
      <AddComment
        loading={creating}
        onSubmit={(body) => createComment(itemId, body)}
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
    paddingTop: layout.padding
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
