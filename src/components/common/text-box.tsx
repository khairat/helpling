import React, { forwardRef } from 'react'
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TextInputProps,
  View
} from 'react-native'

import { colors, layout, typography } from '../../styles'

export const TextBox = forwardRef<TextInput, TextInputProps>(
  ({ style, ...props }, ref) => {
    if (props.multiline) {
      return (
        <View style={styles.main}>
          <TextInput
            placeholderTextColor={colors.foregroundDark}
            ref={ref}
            style={[styles.textBox, style, styles.multiline]}
            {...props}
          />
        </View>
      )
    }

    return (
      <TextInput
        placeholderTextColor={colors.foregroundDark}
        ref={ref}
        style={[styles.textBox, style]}
        {...props}
      />
    )
  }
)

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.backgroundLight,
    borderRadius: layout.radius,
    paddingVertical: layout.padding / 2
  },
  multiline: {
    ...typography.paragraph,
    height: height / 4
  },
  textBox: {
    ...typography.regular,
    backgroundColor: colors.backgroundLight,
    borderRadius: layout.radius,
    color: colors.foreground,
    height: layout.textBox,
    paddingHorizontal: layout.margin
  }
})
