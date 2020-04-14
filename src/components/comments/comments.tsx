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
  const { addComment, adding, comments, loading, unsubscribe } = useComments(
    itemId
  )

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
      <FlatList
        contentContainerStyle={styles.list}
        data={comments}
        ListEmptyComponent={Empty}
        ListHeaderComponent={
          comments.length > 0 ? (
            <View style={styles.header}>
              <Text style={styles.title}>Comments ({comments.length})</Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => <Comment item={item} />}
        style={styles.main}
      />
      <AddComment
        loading={adding}
        onSubmit={(body) => addComment(itemId, body)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: layout.margin
  },
  list: {
    flexGrow: 1
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
