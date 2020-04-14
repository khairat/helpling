import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { img_ui_add } from '../../assets'
import { Header, HeaderButton } from '../../components/common'
import { layout } from '../../styles'
import { RequestType } from '../../types'
import { CreateRequest } from './create'
import { EditRequest } from './edit'
import { Request } from './request'
import { Requests } from './requests'

export type RequestsParamList = {
  CreateRequest: undefined
  EditRequest: {
    request: RequestType
  }
  Request: {
    request: RequestType
  }
  Requests: undefined
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
        options={({ navigation: { navigate } }) => ({
          header: (props) => (
            <Header
              {...props}
              right={
                <HeaderButton
                  icon={img_ui_add}
                  onPress={() => navigate('CreateRequest')}
                />
              }
            />
          ),
          headerStyle,
          title: 'Requests'
        })}
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
      <Screen
        component={CreateRequest}
        name="CreateRequest"
        options={{
          header: (props) => <Header {...props} />,
          headerStyle,
          title: 'Create request'
        }}
      />
      <Screen
        component={EditRequest}
        name="EditRequest"
        options={{
          header: (props) => <Header {...props} />,
          headerStyle,
          title: 'Edit request'
        }}
      />
    </Navigator>
  )
}
