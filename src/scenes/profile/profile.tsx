import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '../../components/common'
import { useAuth } from '../../store'
import { colors, layout, typography } from '../../styles'

export const Profile: FunctionComponent = () => {
  const [{ unloading, user }, { signOut }] = useAuth()

  const menu = [
    {
      label: 'Sign out'
    }
  ]

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
