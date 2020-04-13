import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'

import { Onboarding } from './onboarding'

const { Navigator, Screen } = createStackNavigator()

export const OnboardingNavigator: FunctionComponent = () => (
  <Navigator>
    <Screen
      component={Onboarding}
      name="Onboarding"
      options={{
        headerShown: false
      }}
    />
  </Navigator>
)
