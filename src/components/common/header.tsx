import { StackHeaderProps } from '@react-navigation/stack'
import React, {
  Children,
  cloneElement,
  FunctionComponent,
  isValidElement,
  ReactChild,
  ReactElement,
  useState
} from 'react'
import {
  ActivityIndicator,
  Animated,
  LayoutAnimation,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Image, { Source } from 'react-native-fast-image'
import { useSafeArea } from 'react-native-safe-area-context'

import { img_ui_back, img_ui_menu } from '../../assets'
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

export const HeaderButtonGroup: FunctionComponent = ({ children }) => {
  const [visible, setVisible] = useState(false)

  const buttons = Children.toArray(children).filter(Boolean)

  if (buttons.length > 2) {
    return (
      <>
        <HeaderButton
          icon={img_ui_menu}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

            setVisible(!visible)
          }}
        />
        <View style={[styles.menu, visible && styles.menuVisible]}>
          {buttons.map((button, index) => (
            <View key={index} style={styles.menuItem}>
              {cloneElement(button as ReactElement<HeaderButtonProps>, {
                onPress: () => {
                  if (isValidElement(button)) {
                    button.props.onPress()
                  }

                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  )

                  setVisible(false)
                },
                showLabel: true
              })}
            </View>
          ))}
        </View>
      </>
    )
  }

  return <>{buttons}</>
}

interface HeaderButtonProps {
  icon: Source
  label?: string
  showLabel?: boolean

  onPress: () => void
}

export const HeaderButton: FunctionComponent<HeaderButtonProps> = ({
  icon,
  label,
  onPress,
  showLabel
}) => (
  <Touchable onPress={onPress} style={styles.button}>
    {!!label && showLabel && <Text style={styles.label}>{label}</Text>}
    <Image source={icon} style={styles.icon} />
  </Touchable>
)

export const HeaderSpinner: FunctionComponent = () => (
  <ActivityIndicator color={colors.accent} style={styles.spinner} />
)

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  icon: {
    height: layout.icon,
    margin: layout.margin,
    width: layout.icon
  },
  label: {
    ...typography.regular,
    ...typography.medium,
    color: colors.foreground,
    marginLeft: layout.margin
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
  menu: {
    backgroundColor: colors.backgroundLight,
    borderBottomLeftRadius: layout.radius,
    left: '100%',
    marginTop: layout.icon + layout.margin * 2,
    position: 'absolute',
    top: 0
  },
  menuItem: {
    borderTopColor: colors.background,
    borderTopWidth: layout.border
  },
  menuVisible: {
    left: 'auto',
    right: 0
  },
  right: {
    bottom: 0,
    flexDirection: 'row',
    marginEnd: layout.margin,
    position: 'absolute',
    right: -layout.margin
  },
  spinner: {
    margin: layout.margin
  },
  title: {
    ...typography.regular,
    ...typography.medium,
    color: colors.primary,
    margin: layout.margin
  }
})
