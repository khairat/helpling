import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect, useState } from 'react'

import { Comments } from '../../components/comments'
import { Empty, Spinner } from '../../components/common'
import { Actions, ListItem } from '../../components/requests'
import { useRequests } from '../../store'
import { RequestType } from '../../types'
import { RequestsParamList } from '.'

interface Props {
  navigation: StackNavigationProp<RequestsParamList, 'Request'>
  route: RouteProp<RequestsParamList, 'Request'>
}

export const Request: FunctionComponent<Props> = ({
  navigation: { setOptions },
  route: {
    params: { id }
  }
}) => {
  const [{ fetchingOne, others }, { fetchOne }] = useRequests()

  const [request, setRequest] = useState<RequestType>()

  useEffect(() => {
    fetchOne('request', id)
  }, [fetchOne, id])

  useEffect(() => {
    const request = others[id]

    if (request) {
      setRequest(request)
    }
  }, [fetchOne, id, others])

  useEffect(() => {
    if (request) {
      setOptions({
        header: (props) => (
          <Actions header={props} item={request} kind="request" />
        )
      })
    }
  }, [request, setOptions])

  if (fetchingOne) {
    return <Spinner />
  }

  if (!request) {
    return <Empty icon="error" message="Request not found." />
  }

  return (
    <>
      <ListItem item={request} />
      <Comments itemId={id} kind="request" />
    </>
  )
}
