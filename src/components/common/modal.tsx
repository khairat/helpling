import React, { FunctionComponent } from 'react'
import {
  Image,
  Modal as ReactNativeModal,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native'

import { img_close } from '../../assets'
import { colors, layout, typography } from '../../styles'
import { KeyboardView } from './keyboard-view'
import { Touchable } from './touchable'

interface Props {
  title: string
  visible: boolean
  style?: ViewStyle

  onClose: () => void
}

export const Modal: FunctionComponent<Props> = ({
  children,
  onClose,
  style,
  title,
  visible
}) => (
  <ReactNativeModal
    animationType="fade"
    onRequestClose={onClose}
    transparent
    visible={visible}>
    <KeyboardView>
      <View style={styles.modal}>
        <View style={[styles.main, style]}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Touchable onPress={onClose}>
              <Image source={img_close} style={styles.icon} />
            </Touchable>
          </View>
          {children}
        </View>
      </View>
    </KeyboardView>
  </ReactNativeModal>
)

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.accent,
    borderTopEndRadius: layout.radius,
    borderTopStartRadius: layout.radius,
    flexDirection: 'row'
  },
  icon: {
    height: layout.icon,
    margin: layout.margin,
    width: layout.icon
  },
  main: {
    backgroundColor: colors.backgroundLight,
    borderRadius: layout.radius,
    margin: layout.margin * 2,
    maxHeight: '80%',
    overflow: 'hidden',
    width: '80%'
  },
  modal: {
    alignItems: 'center',
    backgroundColor: colors.modal,
    borderColor: colors.border,
    borderWidth: layout.border,
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    ...typography.regular,
    ...typography.medium,
    color: colors.foreground,
    flex: 1,
    margin: layout.margin
  }
})
