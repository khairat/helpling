import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'

import { Form } from '../../components/requests'
import { useRequests } from '../../store'
import { RequestsParamList } from '.'

interface Props {
  navigation: StackNavigationProp<RequestsParamList, 'CreateRequest'>
  route: RouteProp<RequestsParamList, 'CreateRequest'>
}

export const CreateRequest: FunctionComponent<Props> = ({
  navigation: { replace }
}) => {
  const [{ creating }, { createRequest }] = useRequests()

  return (
    <Form
      kind="request"
      loading={creating}
      onCreate={async (data) => {
        const id = await createRequest('requests', data)

        replace('Request', {
          id
        })
      }}
    />
  )
}
