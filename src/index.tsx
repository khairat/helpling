import { NavigationContainer } from '@react-navigation/native'
import React, { FunctionComponent, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  Dialog,
  KeyboardView,
  Notification,
  Spinner
} from './components/common'
import { nav } from './lib'
import { MainNavigator, OnboardingNavigator } from './scenes'
import { useAuth } from './store'
import { NavigatorTheme } from './styles'

export const Helpling: FunctionComponent = () => {
  const [{ loading, user }, { destroy, init }] = useAuth()

  useEffect(() => {
    init()

    return () => {
      destroy()
    }
  }, [destroy, init])

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
