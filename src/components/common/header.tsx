import { StackHeaderProps } from '@react-navigation/stack'
import React, { FunctionComponent, ReactChild } from 'react'
import {
  Animated,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'

import { img_ui_back } from '../../assets'
import { colors, layout, typography } from '../../styles'
import { Touchable } from './touchable'

interface Props {
  left?: ReactChild
  right?: ReactChild
}

export const Header: FunctionComponent<Props & StackHeaderProps> = ({
  left,
  navigation: { goBack },
  previous,
  right,
  scene: {
    descriptor: {
      options: { title }
    },
    progress: { current, next }
  }
}) => {
  const { top } = useSafeArea()

  const opacity = Animated.add(current, next ? next : 0).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0]
  })

  return (
    <Animated.View
      style={[
        styles.main,
        {
          height: layout.header + top,
          opacity,
          paddingTop: top
        }
      ]}>
      {(previous || left) && (
        <View style={styles.left}>
          {previous && <HeaderButton icon={img_ui_back} onPress={goBack} />}
          {left}
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      {right && <View style={styles.right}>{right}</View>}
    </Animated.View>
  )
}

interface HeaderButtonProps {
  icon: ImageSourcePropType

  onPress: () => void
}

export const HeaderButton: FunctionComponent<HeaderButtonProps> = ({
  icon,
  onPress
}) => (
  <Touchable onPress={onPress}>
    <Image source={icon} style={styles.icon} />
  </Touchable>
)

const styles = StyleSheet.create({
  icon: {
    height: layout.icon,
    margin: layout.margin,
    width: layout.icon
  },
  left: {
    bottom: 0,
    flexDirection: 'row',
    left: -layout.margin,
    marginStart: layout.margin,
    position: 'absolute'
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  right: {
    bottom: 0,
    flexDirection: 'row',
    marginEnd: layout.margin,
    position: 'absolute',
    right: -layout.margin
  },
  title: {
    ...typography.regular,
    ...typography.medium,
    color: colors.primary,
    margin: layout.margin
  }
})
