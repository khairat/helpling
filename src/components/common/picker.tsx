import React, { FunctionComponent, useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native'

import { img_close, img_expand, img_search } from '../../assets'
import { colors, layout, typography } from '../../styles'
import { PickerItemType } from '../../types'
import { Modal } from './modal'
import { TextBox } from './text-box'
import { Touchable } from './touchable'

interface Props {
  data: PickerItemType[]
  placeholder: string
  title: string
  style?: ViewStyle
  selected?: PickerItemType

  onChange: (item: PickerItemType) => void
}

export const Picker: FunctionComponent<Props> = ({
  data,
  onChange,
  placeholder,
  selected,
  style,
  title
}) => {
  const [visible, setVisible] = useState(false)
  const [query, setQuery] = useState('')

  return (
    <>
      <Touchable
        onPress={() => setVisible(true)}
        style={[styles.textBox, style]}>
        <Text
          style={[styles.textBoxLabel, selected && styles.textBoxLabelActive]}>
          {selected?.label ?? placeholder}
        </Text>
        <Image source={img_expand} style={styles.icon} />
      </Touchable>
      <Modal
        onClose={() => setVisible(false)}
        style={styles.modal}
        title={title}
        visible={visible}>
        {data.length > 10 && (
          <View style={styles.search}>
            <Image source={img_search} style={styles.icon} />
            <TextBox
              onChangeText={(query) => setQuery(query)}
              placeholder="Filter"
              style={styles.query}
              value={query}
            />
            {query.length > 0 && (
              <Touchable onPress={() => setQuery('')}>
                <Image source={img_close} style={styles.icon} />
              </Touchable>
            )}
          </View>
        )}
        <FlatList
          data={data.filter(({ label }) =>
            label.toLowerCase().includes(query.toLowerCase())
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyboardShouldPersistTaps="always"
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <Touchable
              onPress={() => {
                onChange(item)

                setVisible(false)
              }}>
              <Text
                style={[
                  styles.label,
                  selected?.value === item.value && styles.selected
                ]}>
                {item.label}
              </Text>
            </Touchable>
          )}
        />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: layout.icon,
    margin: (layout.textBox - layout.icon) / 2,
    width: layout.icon
  },
  label: {
    ...typography.regular,
    color: colors.foreground,
    margin: layout.padding * 1.5
  },
  modal: {
    height: '80%'
  },
  query: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    flex: 1,
    paddingStart: 0
  },
  search: {
    backgroundColor: colors.background,
    flexDirection: 'row'
  },
  selected: {
    color: colors.accent
  },
  separator: {
    backgroundColor: colors.background,
    height: 1
  },
  textBox: {
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderRadius: layout.radius,
    flexDirection: 'row',
    height: layout.textBox,
    paddingLeft: layout.margin
  },
  textBoxLabel: {
    ...typography.regular,
    color: colors.foregroundDark,
    flex: 1
  },
  textBoxLabelActive: {
    color: colors.foreground
  }
})
