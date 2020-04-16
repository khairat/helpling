import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'

import { TabBar } from '../components/common'
import { MessagesNavigator } from './messages'
import { OffersNavigator } from './offers'
import { ProfileNavigator } from './profile'
import { RequestsNavigator } from './requests'

const { Navigator, Screen } = createBottomTabNavigator()

export const MainNavigator: FunctionComponent = () => (
  <Navigator lazy tabBar={(props) => <TabBar {...props} />}>
    <Screen component={RequestsNavigator} name="Requests" />
    <Screen component={OffersNavigator} name="Offers" />
    <Screen component={MessagesNavigator} name="Messages" />
    <Screen component={ProfileNavigator} name="Profile" />
  </Navigator>
)

export { OnboardingNavigator } from './onboarding'
