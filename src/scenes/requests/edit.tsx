import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect, useState } from 'react'

import { Empty, Spinner } from '../../components/common'
import { Form } from '../../components/requests'
import { useRequests } from '../../store'
import { RequestType } from '../../types'
import { RequestsParamList } from '.'

interface Props {
  navigation: StackNavigationProp<RequestsParamList, 'EditRequest'>
  route: RouteProp<RequestsParamList, 'EditRequest'>
}

export const EditRequest: FunctionComponent<Props> = ({
  route: {
    params: { id }
  }
}) => {
  const [{ fetching, others, updating }, { fetchOne, update }] = useRequests()

  const [request, setRequest] = useState<RequestType>()

  useEffect(() => {
    const request = others[id]

    if (request) {
      setRequest(request)
    } else {
      fetchOne('request', id)
    }
  }, [fetchOne, id, others])

  if (fetching) {
    return <Spinner />
  }

  if (!request) {
    return <Empty icon="error" message="Request not found." />
  }

  return (
    <Form
      item={request}
      kind="request"
      loading={updating}
      onUpdate={(id, description) => update('requests', id, description)}
    />
  )
}
