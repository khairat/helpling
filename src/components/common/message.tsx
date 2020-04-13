import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'

import { colors, layout, typography } from '../../styles'

interface Props {
  message: string
  style?: ViewStyle
  type?: 'message' | 'error' | 'success'
}

export const Message: FunctionComponent<Props> = ({
  message,
  style,
  type = 'message'
}) => (
  <View
    style={[
      styles.main,
      style,
      type === 'error' && styles.error,
      type === 'success' && styles.success
    ]}>
    <Text style={styles.message}>{message}</Text>
  </View>
)

const styles = StyleSheet.create({
  error: {
    backgroundColor: colors.state.error
  },
  main: {
    backgroundColor: colors.state.message,
    borderRadius: layout.radius,
    padding: layout.padding
  },
  message: {
    ...typography.paragraph,
    ...typography.medium,
    color: '#fff'
  },
  success: {
    backgroundColor: colors.state.success
  }
})
