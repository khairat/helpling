import React, { FunctionComponent } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import Image from 'react-native-fast-image'

import { colors, layout } from '../../styles'

interface Props {
  seed: string
  size?: 'small' | 'large'
  style?: ViewStyle
}

export const Avatar: FunctionComponent<Props> = ({ seed, size, style }) => (
  <Image
    source={{
      uri: `https://api.adorable.io/avatar/${seed}`
    }}
    style={[styles.main, size === 'large' && styles.large, style]}
  />
)

const styles = StyleSheet.create({
  large: {
    height: layout.icon * 2,
    width: layout.icon * 2
  },
  main: {
    backgroundColor: colors.backgroundLight,
    borderRadius: layout.icon,
    height: layout.icon,
    width: layout.icon
  }
})
