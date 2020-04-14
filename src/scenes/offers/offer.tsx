import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'

import { Comments } from '../../components/comments'
import { ListItem } from '../../components/requests'
import { OffersParamList } from '.'

interface Props {
  navigation: StackNavigationProp<OffersParamList, 'Offer'>
  route: RouteProp<OffersParamList, 'Offer'>
}

export const Offer: FunctionComponent<Props> = ({
  route: {
    params: { offer }
  }
}) => {
  return (
    <>
      <ListItem item={offer} />
      <Comments itemId={offer.id} />
    </>
  )
}
