import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Image from 'react-native-fast-image'

import { img_types } from '../../assets'
import { useUser } from '../../store'
import { colors, layout, typography } from '../../styles'
import { RequestType } from '../../types'
import { Timestamp } from '../common'

interface Props {
  item: RequestType
}

export const ListItem: FunctionComponent<Props> = ({ item }) => {
  const [{ user }] = useUser()

  return (
    <View style={styles.main}>
      <Image source={img_types[item.type]} style={styles.type} />
      <View style={styles.details}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.location}>
          {item.city}, {item.country}
        </Text>
        <View style={styles.meta}>
          <Text style={[styles.metaLabel, styles.name]}>
            {user?.id === item.user.id ? 'YOU' : item.user.name}
          </Text>
          <Timestamp style={styles.metaLabel} time={item.createdAt} />
          <Text
            style={[
              styles.metaLabel,
              styles.status,
              item.status === 'accepted' && styles.accepted,
              item.status === 'completed' && styles.completed,
              item.status === 'pending' && styles.pending
            ]}>
            {item.status}
            {item.status !== 'pending' && ` by ${item.helpling?.name}`}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  accepted: {
    color: colors.status.accepted
  },
  completed: {
    color: colors.status.completed
  },
  description: {
    ...typography.paragraph,
    color: colors.foreground
  },
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  location: {
    ...typography.small,
    color: colors.foregroundDark,
    marginTop: layout.padding
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
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
  },
  pending: {
    color: colors.status.pending
  },
  status: {
    ...typography.medium
  },
  type: {
    height: layout.icon * 2,
    width: layout.icon * 2
  }
})
