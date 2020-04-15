import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { Comments } from '../../components/comments'
import { Actions, ListItem } from '../../components/requests'
import { RequestsParamList } from '.'

interface Props {
  navigation: StackNavigationProp<RequestsParamList, 'Request'>
  route: RouteProp<RequestsParamList, 'Request'>
}

export const Request: FunctionComponent<Props> = ({
  navigation: { setOptions },
  route: {
    params: { request }
  }
}) => {
  useEffect(() => {
    setOptions({
      header: (props) => (
        <Actions header={props} item={request} kind="request" />
      )
    })
  }, [request, setOptions])

  return (
    <>
      <ListItem item={request} />
      <Comments itemId={request.id} />
    </>
  )
}
