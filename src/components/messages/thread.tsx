import { differenceBy } from 'lodash'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, layout, typography } from '../../styles'
import { ThreadType, UserType } from '../../types'
import { Avatar, Timestamp } from '../common'

interface Props {
  thread: ThreadType
  user?: UserType
}

export const Thread: FunctionComponent<Props> = ({ thread, user }) => {
  const other = differenceBy(thread.users, [user], 'id').pop()

  return (
    <View style={styles.main}>
      <Avatar seed={`${other?.id}`} size="large" />
      <View style={styles.details}>
        <Text style={styles.user}>{other?.name}</Text>
        {!!thread.last && (
          <View style={styles.last}>
            <Text style={styles.message}>{thread.last}</Text>
          </View>
        )}
        <Timestamp style={styles.time} time={thread.updatedAt} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  last: {
    alignSelf: 'flex-start',
    backgroundColor: colors.backgroundLight,
    borderRadius: layout.radius * 5,
    marginTop: layout.padding,
    paddingHorizontal: layout.padding * layout.lineHeight,
    paddingVertical: layout.padding
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  message: {
    ...typography.footnote,
    color: colors.foreground
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
