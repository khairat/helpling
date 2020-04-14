import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'

import { Form } from '../../components/requests'
import { useActions } from '../../hooks'
import { OffersParamList } from '.'

interface Props {
  navigation: StackNavigationProp<OffersParamList, 'CreateOffer'>
  route: RouteProp<OffersParamList, 'CreateOffer'>
}

export const CreateOffer: FunctionComponent<Props> = ({
  navigation: { replace }
}) => {
  const { create, creating } = useActions('offers')

  return (
    <Form
      kind="offer"
      loading={creating}
      onCreate={async (data) => {
        const offer = await create(data)

        replace('Offer', {
          offer
        })
      }}
    />
  )
}
