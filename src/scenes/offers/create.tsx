import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'

import { Form } from '../../components/requests'
import { useRequests } from '../../store'
import { OffersParamList } from '.'

interface Props {
  navigation: StackNavigationProp<OffersParamList, 'CreateOffer'>
  route: RouteProp<OffersParamList, 'CreateOffer'>
}

export const CreateOffer: FunctionComponent<Props> = ({
  navigation: { replace }
}) => {
  const [{ creating }, { createRequest }] = useRequests()

  return (
    <Form
      kind="offer"
      loading={creating}
      onCreate={async (data) => {
        const id = await createRequest('offers', data)

        replace('Offer', {
          id
        })
      }}
    />
  )
}
