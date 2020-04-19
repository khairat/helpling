import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { Header } from '../../components/common'
import { layout } from '../../styles'
import { Landing } from './landing'
import { Onboarding } from './onboarding'

export type OnboardingParamList = {
  Landing: undefined
  Onboarding: {
    userId: string
  }
}

const { Navigator, Screen } = createStackNavigator<OnboardingParamList>()

export const OnboardingNavigator: FunctionComponent = () => {
  const { top } = useSafeArea()

  const headerStyle = {
    height: layout.header + top
  }

  return (
    <Navigator>
      <Screen
        component={Landing}
        name="Landing"
        options={{
          headerShown: false
        }}
      />
      <Screen
        component={Onboarding}
        name="Onboarding"
        options={{
          header: (props) => <Header {...props} />,
          headerStyle,
          title: 'Onboarding'
        }}
      />
    </Navigator>
  )
}
