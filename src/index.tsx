import { NavigationContainer } from '@react-navigation/native'
import * as Sentry from '@sentry/react-native'
import React, { FunctionComponent, useEffect } from 'react'
import { Linking, Platform } from 'react-native'
import codePush from 'react-native-code-push'
import { CODE_PUSH_KEY_ANDROID, CODE_PUSH_KEY_IOS } from 'react-native-dotenv'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  Dialog,
  KeyboardView,
  Notification,
  Spinner
} from './components/common'
import { nav, navRef, notifications } from './lib'
import { MainNavigator, OnboardingNavigator } from './scenes'
import { useAuth, useMessages, useRequests, useThreads, useUser } from './store'
import { NavigatorTheme } from './styles'

const Helpling: FunctionComponent = () => {
  const [{ initialising, signedIn }, { cleanUpAuth, initialise }] = useAuth()
  const [{ loading, user }, { cleanUpUser, fetchUser }] = useUser()
  const [, { cleanUpRequests }] = useRequests()
  const [, { cleanUpMessages }] = useMessages()
  const [, { cleanUpThreads }] = useThreads()

  useEffect(() => {
    notifications.init()

    initialise()
    fetchUser()

    return () => {
      cleanUpAuth()
      cleanUpUser()
      cleanUpMessages()
      cleanUpRequests()
      cleanUpThreads()
    }
  }, [
    cleanUpAuth,
    cleanUpMessages,
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
    <NavigationContainer
      onStateChange={(state) => nav.onStateChange(state)}
      ref={navRef}
      theme={NavigatorTheme}>
      <SafeAreaProvider>
        <KeyboardView>
          {initialising || loading ? (
            <Spinner />
          ) : signedIn && user ? (
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

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  deploymentKey: Platform.select({
    android: CODE_PUSH_KEY_ANDROID,
    ios: CODE_PUSH_KEY_IOS
  }),
  installMode: codePush.InstallMode.ON_NEXT_RESUME
})(Helpling)

codePush.getUpdateMetadata().then((update) => {
  if (update) {
    Sentry.setRelease(update.appVersion + '-codepush:' + update.label)
  }
})
