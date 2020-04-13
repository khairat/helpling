import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { Header } from '../../components/common'
import { layout } from '../../styles'
import { Requests } from './requests'

const { Navigator, Screen } = createStackNavigator()

export const RequestsNavigator: FunctionComponent = () => {
  const { top } = useSafeArea()

  const headerStyle = {
    height: layout.header + top
  }

  return (
    <Navigator>
      <Screen
        component={Requests}
        name="Requests"
        options={{
          header: (props) => <Header {...props} />,
          headerStyle,
          title: 'Requests'
        }}
      />
    </Navigator>
  )
}
