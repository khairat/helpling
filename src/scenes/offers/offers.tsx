import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, typography } from '../../styles'

export const Offers: FunctionComponent = () => (
  <View style={styles.main}>
    <Text style={styles.title}>Offers</Text>
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
