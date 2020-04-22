import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect, useState } from 'react'

import { Comments } from '../../components/comments'
import { Empty, Spinner } from '../../components/common'
import { Actions, ListItem } from '../../components/requests'
import { useRequests } from '../../store'
import { RequestType } from '../../types'
import { OffersParamList } from '.'

interface Props {
  navigation: StackNavigationProp<OffersParamList, 'Offer'>
  route: RouteProp<OffersParamList, 'Offer'>
}

export const Offer: FunctionComponent<Props> = ({
  navigation: { setOptions },
  route: {
    params: { id }
  }
}) => {
  const [{ fetchingOne, others }, { fetchOne }] = useRequests()

  const [offer, setOffer] = useState<RequestType>()

  useEffect(() => {
    fetchOne('offer', id)
  }, [fetchOne, id])

  useEffect(() => {
    const offer = others[id]

    if (offer) {
      setOffer(offer)
    }
  }, [fetchOne, id, others])

  useEffect(() => {
    if (offer) {
      setOptions({
        header: (props) => <Actions header={props} item={offer} kind="offer" />
      })
    }
  }, [offer, setOptions])

  if (fetchingOne) {
    return <Spinner />
  }

  if (!offer) {
    return <Empty icon="error" message="Offer not found." />
  }

  return (
    <>
      <ListItem item={offer} />
      <Comments itemId={id} kind="offer" />
    </>
  )
}
