import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { Header } from '../../components/common'
import { layout } from '../../styles'
import { MyOffers } from './offers'
import { Profile } from './profile'
import { MyRequests } from './requests'

export type ProfileParamList = {
  MyOffers: {
    helpling?: boolean
    userId: string
  }
  MyRequests: {
    helpling?: boolean
    userId: string
  }
  Profile: undefined
}

const { Navigator, Screen } = createStackNavigator<ProfileParamList>()

export const ProfileNavigator: FunctionComponent = () => {
  const { top } = useSafeArea()

  const headerStyle = {
    height: layout.header + top
  }

  return (
    <Navigator>
      <Screen
        component={Profile}
        name="Profile"
        options={{
          header: (props) => <Header {...props} />,
          headerStyle,
          title: 'Profile'
        }}
      />
      <Screen
        component={MyOffers}
        name="MyOffers"
        options={({
          route: {
            params: { helpling }
          }
        }) => ({
          header: (props) => <Header {...props} />,
          headerStyle,
          title: `My${helpling ? ' accepted' : ''} offers`
        })}
      />
      <Screen
        component={MyRequests}
        name="MyRequests"
        options={({
          route: {
            params: { helpling }
          }
        }) => ({
          header: (props) => <Header {...props} />,
          headerStyle,
          title: `My${helpling ? ' accepted' : ''} requests`
        })}
      />
    </Navigator>
  )
}
