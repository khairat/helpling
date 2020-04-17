import { NavigationContainer } from '@react-navigation/native'
import React, { FunctionComponent, useEffect } from 'react'
import { Linking } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  Dialog,
  KeyboardView,
  Notification,
  Spinner
} from './components/common'
import { nav, navRef, notifications } from './lib'
import { MainNavigator, OnboardingNavigator } from './scenes'
import { useAuth, useRequests, useThreads, useUser } from './store'
import { NavigatorTheme } from './styles'

export const Helpling: FunctionComponent = () => {
  const [{ initialising }, { cleanUpAuth, initialise }] = useAuth()
  const [{ loading, user }, { cleanUpUser, fetchUser }] = useUser()
  const [, { cleanUpRequests }] = useRequests()
  const [, { cleanUpThreads }] = useThreads()

  useEffect(() => {
    notifications.init()

    initialise()
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
    initialise
  ])

  useEffect(() => {
    notifications
      .getInitial()
      .then((notification) => nav.handleDeepLink(notification?.data?.deeplink))

    Linking.getInitialURL().then((url) => nav.handleDeepLink(url))

    Linking.addEventListener('url', ({ url }) => nav.handleDeepLink(url))

    return () => {
      Linking.removeEventListener('url', ({ url }) => nav.handleDeepLink(url))
    }
  }, [])

  return (
    <NavigationContainer ref={navRef} theme={NavigatorTheme}>
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
