import React, { FunctionComponent, useState } from 'react'
import { ActivityIndicator, Keyboard, StyleSheet, View } from 'react-native'
import Image from 'react-native-fast-image'

import { img_ui_send } from '../../assets'
import { colors, layout } from '../../styles'
import { TextBox } from './text-box'
import { Touchable } from './touchable'

interface Props {
  dismiss?: boolean
  loading: boolean

  onReply: (body: string) => void
}

export const Reply: FunctionComponent<Props> = ({
  dismiss = true,
  loading,
  onReply
}) => {
  const [body, setBody] = useState('')

  const reply = () => {
    if (!body) {
      return
    }

    onReply(body)

    setBody('')

    if (dismiss) {
      Keyboard.dismiss()
    }
  }

  return (
    <View style={styles.main}>
      <TextBox
        onChangeText={(body) => setBody(body)}
        onSubmitEditing={reply}
        placeholder="Say something nice"
        returnKeyType="go"
        style={styles.textBox}
        value={body}
      />
      <View style={styles.button}>
        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <Touchable onPress={reply} style={styles.button}>
            <Image source={img_ui_send} style={styles.icon} />
          </Touchable>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    height: layout.textBox,
    justifyContent: 'center',
    width: layout.textBox
  },
  icon: {
    height: layout.icon,
    width: layout.icon
  },
  main: {
    backgroundColor: colors.background,
    flexDirection: 'row'
  },
  textBox: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    flex: 1
  }
})
