import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  Dialog,
  KeyboardView,
  Notification,
  Spinner,
  TabBar
} from './components/common'
import { useAuth } from './hooks'
import {
  OffersNavigator,
  OnboardingNavigator,
  ProfileNavigator,
  RequestsNavigator
} from './scenes'
import { NavigatorTheme } from './styles'

const { Navigator, Screen } = createBottomTabNavigator()

export const Helpling: FunctionComponent = () => {
  const { isLoggedIn, loading } = useAuth(true)

  return (
    <NavigationContainer theme={NavigatorTheme}>
      <SafeAreaProvider>
        <KeyboardView>
          {loading ? (
            <Spinner />
          ) : isLoggedIn ? (
            <Navigator lazy tabBar={(props) => <TabBar {...props} />}>
              <Screen component={RequestsNavigator} name="Requests" />
              <Screen component={OffersNavigator} name="Offers" />
              <Screen component={ProfileNavigator} name="Profile" />
            </Navigator>
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
