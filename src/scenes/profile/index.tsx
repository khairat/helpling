import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { Header } from '../../components/common'
import { layout } from '../../styles'
import { RequestType } from '../../types'
import { EditOffer } from '../offers/edit'
import { Offer } from '../offers/offer'
import { EditRequest } from '../requests/edit'
import { Request } from '../requests/request'
import { MyOffers } from './offers'
import { Profile } from './profile'
import { MyRequests } from './requests'

export type ProfileParamList = {
  EditOffer: {
    offer: RequestType
  }
  EditRequest: {
    request: RequestType
  }
  MyOffers: {
    helpling?: boolean
    userId: string
  }
  MyRequests: {
    helpling?: boolean
    userId: string
  }
  Offer: {
    offer: RequestType
  }
  Profile: undefined
  Request: {
    request: RequestType
  }
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
        component={EditRequest}
        name="EditRequest"
        options={{
          header: (props) => <Header {...props} />,
          headerStyle,
          title: 'Edit request'
        }}
      />
      <Screen
        component={Offer}
        name="Offer"
        options={{
          header: (props) => <Header {...props} />,
          headerStyle,
          title: 'Offer'
        }}
      />
      <Screen
        component={EditOffer}
        name="EditOffer"
        options={{
          header: (props) => <Header {...props} />,
          headerStyle,
          title: 'Edit offer'
        }}
      />
    </Navigator>
  )
}
