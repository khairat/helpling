import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect, useState } from 'react'

import { Empty, Spinner } from '../../components/common'
import { Form } from '../../components/requests'
import { useRequests } from '../../store'
import { RequestType } from '../../types'
import { OffersParamList } from '.'

interface Props {
  navigation: StackNavigationProp<OffersParamList, 'EditOffer'>
  route: RouteProp<OffersParamList, 'EditOffer'>
}

export const EditOffer: FunctionComponent<Props> = ({
  route: {
    params: { id }
  }
}) => {
  const [{ fetching, others, updating }, { fetchOne, update }] = useRequests()

  const [offer, setOffer] = useState<RequestType>()

  useEffect(() => {
    const offer = others[id]

    if (offer) {
      setOffer(offer)
    } else {
      fetchOne('offer', id)
    }
  }, [fetchOne, id, others])

  if (fetching) {
    return <Spinner />
  }

  if (!offer) {
    return <Empty icon="error" message="Offer not found." />
  }

  return (
    <Form
      item={offer}
      kind="offer"
      loading={updating}
      onUpdate={(id, description) => update('offers', id, description)}
    />
  )
}
