import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { useUser } from '../../store'
import { ThreadType } from '../../types'
import { Empty, Separator, Touchable } from '../common'
import { Thread } from './thread'

interface Props {
  threads: ThreadType[]
}

export const Threads: FunctionComponent<Props> = ({ threads }) => {
  const { navigate } = useNavigation()

  const [{ user }] = useUser()

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={threads}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={
        <Empty message="You don't have any messages right now. They'll be automatically created when you accept an offer or a request, or someone else accepts one of yours." />
      }
      renderItem={({ item }) => (
        <Touchable
          onPress={() =>
            navigate('Thread', {
              id: item.id
            })
          }>
          <Thread thread={item} user={user} />
        </Touchable>
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1
  }
})
