import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { Comments } from '../../components/comments'
import { Actions, ListItem } from '../../components/requests'
import { OffersParamList } from '.'

interface Props {
  navigation: StackNavigationProp<OffersParamList, 'Offer'>
  route: RouteProp<OffersParamList, 'Offer'>
}

export const Offer: FunctionComponent<Props> = ({
  navigation: { setOptions },
  route: {
    params: { offer }
  }
}) => {
  useEffect(() => {
    setOptions({
      header: (props) => <Actions header={props} item={offer} kind="offer" />
    })
  }, [offer, setOptions])

  return (
    <>
      <ListItem item={offer} />
      <Comments itemId={offer.id} />
    </>
  )
}
