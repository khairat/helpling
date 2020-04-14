import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'

import { Comments } from '../../components/comments'
import { ListItem } from '../../components/requests'
import { RequestsParamList } from '.'

interface Props {
  navigation: StackNavigationProp<RequestsParamList, 'Request'>
  route: RouteProp<RequestsParamList, 'Request'>
}

export const Request: FunctionComponent<Props> = ({
  route: {
    params: { request }
  }
}) => {
  return (
    <>
      <ListItem item={request} />
      <Comments itemId={request.id} />
    </>
  )
}
