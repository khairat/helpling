import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { img_ui_add } from '../../assets'
import { Header, HeaderButton } from '../../components/common'
import { layout } from '../../styles'
import { CreateOffer } from './create'
import { EditOffer } from './edit'
import { Offer } from './offer'
import { Offers } from './offers'

export type OffersParamList = {
  CreateOffer: undefined
  EditOffer: {
    id: string
  }
  Offer: {
    id: string
  }
  Offers: undefined
}

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
        options={({ navigation: { navigate } }) => ({
          header: (props) => (
            <Header
              {...props}
              right={
                <HeaderButton
                  icon={img_ui_add}
                  onPress={() => navigate('CreateOffer')}
                />
              }
            />
          ),
          headerStyle,
          title: 'Offers to help'
        })}
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
        component={CreateOffer}
        name="CreateOffer"
        options={{
          header: (props) => <Header {...props} />,
          headerStyle,
          title: 'Create offer'
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
