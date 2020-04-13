import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { Header } from '../../components/common'
import { layout } from '../../styles'
import { Offers } from './offers'

const { Navigator, Screen } = createStackNavigator()

export const OffersNavigator: FunctionComponent = () => {
  const { top } = useSafeArea()

  const headerStyle = {
    height: layout.header + top
  }

  return (
    <Navigator>
      <Screen
        component={Offers}
        name="Offers"
        options={{
          header: (props) => <Header {...props} />,
          headerStyle,
          title: 'Offers'
        }}
      />
    </Navigator>
  )
}
