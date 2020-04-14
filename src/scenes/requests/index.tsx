import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { Header } from '../../components/common'
import { layout } from '../../styles'
import { RequestType } from '../../types'
import { Request } from './request'
import { Requests } from './requests'

export type RequestsParamList = {
  Requests: undefined
  Request: {
    request: RequestType
  }
}

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
      <Screen
        component={Request}
        name="Request"
        options={{
          header: (props) => <Header {...props} />,
          headerStyle,
          title: 'Request'
        }}
      />
    </Navigator>
  )
}
