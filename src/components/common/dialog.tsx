import React, { FunctionComponent, useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'

import { mitter } from '../../lib'
import { colors, layout, typography } from '../../styles'
import { Button } from './button'
import { KeyboardView } from './keyboard-view'
import { TextBox } from './text-box'

export interface DialogProps {
  defaultValue?: string
  inputType?: 'email' | 'number' | 'password' | 'text'
  labelNegative?: string
  labelPositive?: string
  message: string
  placeholder?: string
  positive?: boolean
  title: string
  type: 'alert' | 'confirm' | 'prompt'

  onNo?: () => void
  onValue?: (value: string) => void
  onYes?: () => void
}

export const Dialog: FunctionComponent = () => {
  const [props, setProps] = useState<DialogProps | null>(null)

  const [value, setValue] = useState('')

  useEffect(() => {
    mitter.onDialog((props) => setProps(props))
  }, [])

  if (!props) {
    return null
  }

  const {
    defaultValue,
    inputType,
    labelNegative,
    labelPositive,
    message,
    onNo,
    onValue,
    onYes,
    placeholder,
    positive,
    title,
    type
  } = props

  return (
    <Modal animationType="fade" transparent>
      <KeyboardView>
        <View style={styles.modal}>
          <View style={styles.main}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.content}>
              <Text style={styles.message}>{message}</Text>
              {type === 'prompt' && (
                <TextBox
                  defaultValue={defaultValue}
                  keyboardType={
                    inputType === 'email'
                      ? 'email-address'
                      : inputType === 'number'
                      ? 'decimal-pad'
                      : 'default'
                  }
                  onChangeText={(value) => setValue(value)}
                  placeholder={placeholder}
                  secureTextEntry={inputType === 'password'}
                  style={styles.input}
                  value={value}
                />
              )}
            </View>
            <View style={styles.footer}>
              {type === 'confirm' ? (
                <>
                  <Button
                    label={labelNegative ?? 'No'}
                    onPress={() => {
                      if (onNo) {
                        onNo()
                      }

                      setProps(null)
                    }}
                    style={styles.button}
                    styleLabel={
                      positive
                        ? styles.buttonLabelNegative
                        : styles.buttonLabelPositive
                    }
                  />
                  <View style={styles.separator} />
                  <Button
                    label={labelPositive ?? 'Yes'}
                    onPress={() => {
                      if (onYes) {
                        onYes()
                      }

                      setProps(null)
                    }}
                    style={styles.button}
                    styleLabel={
                      positive
                        ? styles.buttonLabelPositive
                        : styles.buttonLabelNegative
                    }
                  />
                </>
              ) : type === 'prompt' ? (
                <>
                  <Button
                    label={labelNegative ?? 'Cancel'}
                    onPress={() => setProps(null)}
                    style={styles.button}
                    styleLabel={
                      positive
                        ? styles.buttonLabelNegative
                        : styles.buttonLabelPositive
                    }
                  />
                  <View style={styles.separator} />
                  <Button
                    label={labelPositive ?? 'Submit'}
                    onPress={() => {
                      if (value) {
                        if (onValue) {
                          onValue(value)
                        }

                        setProps(null)
                        setValue('')
                      }
                    }}
                    style={styles.button}
                    styleLabel={
                      positive
                        ? styles.buttonLabelPositive
                        : styles.buttonLabelNegative
                    }
                  />
                </>
              ) : (
                <Button
                  label="Okay"
                  onPress={() => setProps(null)}
                  style={styles.button}
                  styleLabel={styles.buttonLabel}
                />
              )}
            </View>
          </View>
        </View>
      </KeyboardView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 0,
    flex: 1
  },
  buttonLabel: {
    color: colors.state.message
  },
  buttonLabelNegative: {
    color: colors.state.error
  },
  buttonLabelPositive: {
    color: colors.state.success
  },
  content: {
    borderBottomColor: colors.border,
    borderBottomWidth: layout.border,
    borderTopColor: colors.border,
    borderTopWidth: layout.border,
    padding: layout.margin
  },
  footer: {
    flexDirection: 'row'
  },
  input: {
    backgroundColor: colors.background,
    marginTop: layout.margin
  },
  main: {
    backgroundColor: colors.backgroundLight,
    borderRadius: layout.radius,
    overflow: 'hidden',
    width: '70%'
  },
  message: {
    ...typography.paragraph,
    color: colors.foreground,
    textAlign: 'center'
  },
  modal: {
    alignItems: 'center',
    backgroundColor: colors.modal,
    flex: 1,
    justifyContent: 'center'
  },
  separator: {
    backgroundColor: colors.border,
    width: layout.border
  },
  title: {
    ...typography.subtitle,
    color: colors.accent,
    padding: layout.margin,
    textAlign: 'center'
  }
})
