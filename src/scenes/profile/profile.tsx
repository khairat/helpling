import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, typography } from '../../styles'

export const Profile: FunctionComponent = () => (
  <View style={styles.main}>
    <Text style={styles.title}>Profile</Text>
  </View>
)

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    ...typography.title,
    color: colors.foreground
  }
})
