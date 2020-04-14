import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { CommonActions } from '@react-navigation/native'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Image, Keyboard, StyleSheet, View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'

import { img_nav, img_nav_active } from '../../assets'
import { colors, layout } from '../../styles'
import { Touchable } from './touchable'

export const TabBar: FunctionComponent<BottomTabBarProps> = ({
  navigation: { dispatch, emit },
  state: { index, key, routes }
}) => {
  const { bottom } = useSafeArea()

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    Keyboard.addListener('keyboardWillHide', () => setVisible(true))
    Keyboard.addListener('keyboardWillShow', () => setVisible(false))

    return () => {
      Keyboard.removeListener('keyboardWillHide', () => setVisible(true))
      Keyboard.removeListener('keyboardWillShow', () => setVisible(false))
    }
  })

  if (!visible) {
    return null
  }

  return (
    <View style={styles.main}>
      {routes.map((route, active) => (
        <Touchable
          key={active}
          onPress={() => {
            const event = emit({
              canPreventDefault: true,
              target: route.key,
              type: 'tabPress'
            })

            if (index !== active && !event.defaultPrevented) {
              dispatch({
                ...CommonActions.navigate(route.name),
                target: key
              })
            }
          }}
          style={[
            styles.button,
            {
              paddingBottom: bottom + layout.margin
            }
          ]}>
          <Image
            source={
              index === active
                ? img_nav_active[route.name]
                : img_nav[route.name]
            }
            style={[styles.icon, index === active && styles.active]}
          />
        </Touchable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  active: {
    opacity: 1
  },
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin
  },
  icon: {
    height: layout.icon,
    opacity: 0.25,
    width: layout.icon
  },
  main: {
    backgroundColor: colors.backgroundLight,
    borderTopColor: colors.border,
    borderTopWidth: layout.border,
    flexDirection: 'row'
  }
})
