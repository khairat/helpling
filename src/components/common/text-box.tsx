import React, { forwardRef } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

import { colors, layout, typography } from '../../styles'

export const TextBox = forwardRef<TextInput, TextInputProps>(
  ({ style, ...props }, ref) => (
    <TextInput
      placeholderTextColor={colors.foregroundDark}
      ref={ref}
      style={[styles.main, style]}
      {...props}
    />
  )
)

const styles = StyleSheet.create({
  main: {
    ...typography.regular,
    backgroundColor: colors.backgroundLight,
    borderRadius: layout.radius,
    color: colors.foreground,
    height: layout.textBox,
    paddingHorizontal: layout.margin
  }
})
