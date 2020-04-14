import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { useAuth } from '../../store'
import { colors, layout, typography } from '../../styles'
import { CommentType } from '../../types'
import { Timestamp } from '../common'

interface Props {
  item: CommentType
}

export const Comment: FunctionComponent<Props> = ({ item }) => {
  const [{ user }] = useAuth()

  return (
    <View style={styles.main}>
      <Image
        source={{
          uri: `https://api.adorable.io/avatar/${item.user.id}`
        }}
        style={styles.avatar}
      />
      <View style={styles.details}>
        <View style={styles.body}>
          <Text style={styles.bodyText}>{item.body}</Text>
        </View>
        <View style={styles.meta}>
          <Text style={[styles.metaLabel, styles.name]}>
            {user?.id === item.user.id ? 'YOU' : item.user.name}
          </Text>
          <Timestamp style={styles.metaLabel} time={item.createdAt} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: layout.icon,
    height: layout.icon,
    width: layout.icon
  },
  body: {
    alignSelf: 'flex-start',
    backgroundColor: colors.backgroundLight,
    borderRadius: layout.radius,
    padding: layout.padding
  },
  bodyText: {
    ...typography.footnote,
    color: colors.foreground
  },
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: layout.margin,
    paddingVertical: layout.padding
  },
  meta: {
    flexDirection: 'row',
    marginLeft: -layout.padding,
    marginTop: layout.padding
  },
  metaLabel: {
    ...typography.small,
    color: colors.foregroundDark,
    marginLeft: layout.padding
  },
  name: {
    ...typography.medium,
    color: colors.accent
  }
})
