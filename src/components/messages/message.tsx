import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { colors, layout, typography } from '../../styles'
import { MessageType, UserType } from '../../types'

interface Props {
  message: MessageType
  user?: UserType
}

export const Message: FunctionComponent<Props> = ({ message, user }) => {
  const mine = user?.id === message.user.id

  return (
    <View style={styles.main}>
      {!mine && (
        <Image
          source={{
            uri: `https://api.adorable.io/avatar/${message.user.id}`
          }}
          style={styles.avatar}
        />
      )}
      <View style={[styles.message, mine && styles.right]}>
        <View style={[styles.body, mine && styles.bodyRight]}>
          <Text style={styles.bodyText}>{message.body}</Text>
        </View>
        <Text style={styles.time}>
          {moment(message.createdAt).format('ddd LT')}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: layout.icon * 2,
    height: layout.icon * 2,
    marginRight: layout.margin,
    width: layout.icon * 2
  },
  body: {
    alignSelf: 'flex-start',
    backgroundColor: colors.backgroundLight,
    borderRadius: layout.radius,
    maxWidth: '80%',
    padding: layout.padding
  },
  bodyRight: {
    alignSelf: 'flex-end'
  },
  bodyText: {
    ...typography.paragraph,
    color: colors.foreground
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: layout.margin,
    paddingVertical: layout.padding
  },
  message: {
    justifyContent: 'flex-start'
  },
  right: {
    alignItems: 'flex-end',
    flex: 1
  },
  time: {
    ...typography.small,
    color: colors.foregroundDark,
    marginTop: layout.padding
  }
})
