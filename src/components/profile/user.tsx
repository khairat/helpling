import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, layout, typography } from '../../styles'
import { UserType } from '../../types'

interface Props {
  user: UserType
}

export const User: FunctionComponent<Props> = ({ user }) => (
  <View style={styles.main}>
    <Text style={styles.hello}>Hello, {user.name}</Text>
  </View>
)

const styles = StyleSheet.create({
  hello: {
    ...typography.title,
    color: colors.accent
  },
  main: {
    padding: layout.margin
  }
})
