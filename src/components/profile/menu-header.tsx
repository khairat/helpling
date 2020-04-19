import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, layout, typography } from '../../styles'

interface Props {
  title: string
}

export const MenuHeader: FunctionComponent<Props> = ({ title }) => (
  <View style={styles.main}>
    <Text style={styles.title}>{title}</Text>
  </View>
)

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.backgroundDark,
    padding: layout.margin
  },
  title: {
    ...typography.regular,
    ...typography.medium,
    color: colors.primary
  }
})
