import React, { FunctionComponent } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { useComments } from '../../hooks'
import { colors, layout, typography } from '../../styles'
import { Separator, Spinner } from '../common'
import { AddComment } from './add-comment'
import { Comment } from './comment'
import { Empty } from './empty'

interface Props {
  itemId: string
}

export const Comments: FunctionComponent<Props> = ({ itemId }) => {
  const { addComment, adding, comments, loading } = useComments(itemId)

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Comments ({comments.length})</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.list}
        data={comments}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={Empty}
        renderItem={({ item }) => <Comment item={item} />}
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
    borderBottomColor: colors.border,
    borderBottomWidth: layout.border,
    borderTopColor: colors.border,
    borderTopWidth: layout.border * 2,
    padding: layout.margin
  },
  list: {
    flexGrow: 1
  },
  title: {
    ...typography.subtitle,
    color: colors.foreground
  }
})
