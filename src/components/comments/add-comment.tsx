import React, { FunctionComponent, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'

import { img_send } from '../../assets'
import { colors, layout } from '../../styles'
import { TextBox, Touchable } from '../common'

interface Props {
  loading: boolean

  onSubmit: (body: string) => void
}

export const AddComment: FunctionComponent<Props> = ({ loading, onSubmit }) => {
  const [body, setBody] = useState('')

  const submit = () => {
    if (!body) {
      return
    }

    onSubmit(body)

    setBody('')
  }

  return (
    <View style={styles.main}>
      <TextBox
        onChangeText={(body) => setBody(body)}
        onSubmitEditing={submit}
        placeholder="Say something nice"
        returnKeyType="go"
        style={styles.textBox}
        value={body}
      />
      <View style={styles.button}>
        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <Touchable onPress={submit} style={styles.button}>
            <Image source={img_send} style={styles.icon} />
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
    borderTopColor: colors.border,
    borderTopWidth: layout.border * 2,
    flexDirection: 'row'
  },
  textBox: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    flex: 1
  }
})
