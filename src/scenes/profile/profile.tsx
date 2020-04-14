import React, { FunctionComponent, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '../../components/common'
import { useAuth } from '../../hooks'
import { colors, layout, typography } from '../../styles'

export const Profile: FunctionComponent = () => {
  const { signOut, unloading, unsubscribe, user } = useAuth()

  useEffect(
    () => () => {
      if (unsubscribe) {
        unsubscribe()
      }
    },
    [unsubscribe]
  )

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Hello, {user?.name}</Text>
      <Button
        label="Sign out"
        loading={unloading}
        onPress={() => signOut()}
        style={styles.button}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: layout.margin
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    ...typography.title,
    color: colors.foreground
  }
})
