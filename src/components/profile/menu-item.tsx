import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'
import Image from 'react-native-fast-image'

import { img_ui_link } from '../../assets'
import { colors, layout, typography } from '../../styles'
import { MenuItemType } from '../../types'
import { HeaderSpinner, Touchable } from '../common'

interface Props {
  item: MenuItemType
}

export const MenuItem: FunctionComponent<Props> = ({
  item: { icon, label, link, loading, onPress }
}) => (
  <Touchable onPress={onPress} style={styles.main}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.label}>{label}</Text>
    {loading && <HeaderSpinner />}
    {link && <Image source={img_ui_link} style={styles.link} />}
  </Touchable>
)

const styles = StyleSheet.create({
  icon: {
    height: layout.icon,
    margin: layout.margin,
    width: layout.icon
  },
  label: {
    ...typography.regular,
    color: colors.foreground,
    flex: 1
  },
  link: {
    height: layout.icon * 0.7,
    margin: layout.margin,
    opacity: 0.5,
    width: layout.icon * 0.7
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})
