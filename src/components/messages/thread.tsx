import { differenceBy } from 'lodash'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Image from 'react-native-fast-image'

import { colors, layout, typography } from '../../styles'
import { ThreadType, UserType } from '../../types'
import { Timestamp } from '../common'

interface Props {
  thread: ThreadType
  user?: UserType
}

export const Thread: FunctionComponent<Props> = ({ thread, user }) => {
  const other = differenceBy(thread.users, [user], 'id').pop()

  return (
    <View style={styles.main}>
      <Image
        source={{
          uri: `https://api.adorable.io/avatar/${other?.id}`
        }}
        style={styles.avatar}
      />
      <View style={styles.details}>
        <Text style={styles.user}>{other?.name}</Text>
        {!!thread.last && <Text style={styles.last}>{thread.last}</Text>}
        <Timestamp style={styles.time} time={thread.updatedAt} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: layout.icon * 2,
    height: layout.icon * 2,
    width: layout.icon * 2
  },
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  last: {
    ...typography.paragraph,
    color: colors.foreground,
    marginTop: layout.padding
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  time: {
    ...typography.small,
    color: colors.foregroundDark,
    marginTop: layout.padding
  },
  user: {
    ...typography.regular,
    ...typography.medium,
    color: colors.accent
  }
})
