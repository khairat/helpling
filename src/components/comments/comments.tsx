import React, { FunctionComponent, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { useComments } from '../../hooks'
import { colors, layout, typography } from '../../styles'
import { KindType } from '../../types'
import { Empty, Reply, Spinner } from '../common'
import { Comment } from './comment'

interface Props {
  itemId: string
  kind: KindType
}

export const Comments: FunctionComponent<Props> = ({ itemId, kind }) => {
  const {
    comments,
    create,
    creating,
    fetch,
    fetching,
    unsubscribe
  } = useComments()

  useEffect(() => {
    fetch(itemId)

    return () => {
      unsubscribe()
    }
  }, [fetch, itemId, unsubscribe])

  if (fetching) {
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
        onReply={(body) => create(kind, itemId, body)}
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
