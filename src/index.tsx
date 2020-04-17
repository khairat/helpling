import { NavigationContainer } from '@react-navigation/native'
import React, { FunctionComponent, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  Dialog,
  KeyboardView,
  Notification,
  Spinner
} from './components/common'
import { nav, notifications } from './lib'
import { MainNavigator, OnboardingNavigator } from './scenes'
import { useAuth, useRequests, useThreads, useUser } from './store'
import { NavigatorTheme } from './styles'

export const Helpling: FunctionComponent = () => {
  const [{ initialising }, { cleanUpAuth, init }] = useAuth()
  const [{ loading, user }, { cleanUpUser, fetchUser }] = useUser()
  const [, { cleanUpRequests }] = useRequests()
  const [, { cleanUpThreads }] = useThreads()

  useEffect(() => {
    notifications.init()

    init()
    fetchUser()

    return () => {
      cleanUpAuth()
      cleanUpUser()
      cleanUpRequests()
      cleanUpThreads()
    }
  }, [
    cleanUpAuth,
    cleanUpRequests,
    cleanUpThreads,
    cleanUpUser,
    fetchUser,
    init
  ])

  return (
    <NavigationContainer ref={nav.ref} theme={NavigatorTheme}>
      <SafeAreaProvider>
        <KeyboardView>
          {initialising || loading ? (
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
