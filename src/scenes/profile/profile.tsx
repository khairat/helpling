import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '../../components/common'
import { useAuth } from '../../hooks'
import { colors, layout, typography } from '../../styles'

export const Profile: FunctionComponent = () => {
  const { signOut, unloading, user } = useAuth()

  console.log('user', user)

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Hello, {user?.username}</Text>
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
