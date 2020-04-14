import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'

import { Form } from '../../components/requests'
import { useActions } from '../../hooks'
import { RequestsParamList } from '.'

interface Props {
  navigation: StackNavigationProp<RequestsParamList, 'EditRequest'>
  route: RouteProp<RequestsParamList, 'EditRequest'>
}

export const EditRequest: FunctionComponent<Props> = ({
  route: {
    params: { request }
  }
}) => {
  const { update, updating } = useActions('requests')

  return (
    <Form
      item={request}
      kind="request"
      loading={updating}
      onUpdate={(id, description) => update(id, description)}
    />
  )
}
