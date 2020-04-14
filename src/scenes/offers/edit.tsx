import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'

import { Form } from '../../components/requests'
import { useActions } from '../../hooks'
import { OffersParamList } from '.'

interface Props {
  navigation: StackNavigationProp<OffersParamList, 'EditOffer'>
  route: RouteProp<OffersParamList, 'EditOffer'>
}

export const EditOffer: FunctionComponent<Props> = ({
  route: {
    params: { offer }
  }
}) => {
  const { update, updating } = useActions('offers')

  return (
    <Form
      item={offer}
      kind="offer"
      loading={updating}
      onUpdate={(id, description) => update(id, description)}
    />
  )
}
