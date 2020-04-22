import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, layout, typography } from '../../styles'
import { UserType } from '../../types'
import { Avatar } from '../common'

interface Props {
  user: UserType
}

export const User: FunctionComponent<Props> = ({ user }) => (
  <View style={styles.main}>
    <Avatar seed={user.id} size="large" />
    <View style={styles.details}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.location}>
        {user.city}, {user.country}
      </Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  location: {
    ...typography.small,
    color: colors.foreground,
    marginTop: layout.padding
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  name: {
    ...typography.title,
    color: colors.accent
  }
})
