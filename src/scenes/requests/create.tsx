import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'

import { Form } from '../../components/requests/form'
import { useActions } from '../../hooks'
import { RequestsParamList } from '.'

interface Props {
  navigation: StackNavigationProp<RequestsParamList, 'CreateRequest'>
  route: RouteProp<RequestsParamList, 'CreateRequest'>
}

export const CreateRequest: FunctionComponent<Props> = ({
  navigation: { replace }
}) => {
  const { createRequest, creatingRequest } = useActions()

  return (
    <Form
      loading={creatingRequest}
      onCreate={async (data) => {
        const request = await createRequest(data)

        replace('Request', {
          request
        })
      }}
    />
  )
}
