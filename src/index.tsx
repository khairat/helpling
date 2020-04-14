import { NavigationContainer } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  Dialog,
  KeyboardView,
  Notification,
  Spinner
} from './components/common'
import { useAuth } from './hooks'
import { nav } from './lib'
import { MainNavigator, OnboardingNavigator } from './scenes'
import { NavigatorTheme } from './styles'

export const Helpling: FunctionComponent = () => {
  const { loading, user } = useAuth(true)

  return (
    <NavigationContainer ref={nav.ref} theme={NavigatorTheme}>
      <SafeAreaProvider>
        <KeyboardView>
          {loading ? (
            <Spinner />
          ) : user ? (
            <MainNavigator />
          ) : (
            <OnboardingNavigator />
          )}
        </KeyboardView>
        <Notification />
        <Dialog />
      </SafeAreaProvider>
    </NavigationContainer>
  )
}
