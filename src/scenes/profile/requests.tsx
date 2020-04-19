import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { Empty, Spinner } from '../../components/common'
import { List } from '../../components/requests'
import { useUser } from '../../store'
import { ProfileParamList } from '.'

interface Props {
  navigation: StackNavigationProp<ProfileParamList, 'MyRequests'>
  route: RouteProp<ProfileParamList, 'MyRequests'>
}

export const MyRequests: FunctionComponent<Props> = ({
  route: {
    params: { helpling }
  }
}) => {
  const [
    { acceptedRequests, fetching, requests },
    { fetchAcceptedRequests, fetchRequests }
  ] = useUser()

  useEffect(() => {
    if (helpling) {
      fetchAcceptedRequests()
    } else {
      fetchRequests()
    }
  }, [fetchAcceptedRequests, fetchRequests, helpling])

  if (fetching) {
    return <Spinner />
  }

  if ((helpling ? acceptedRequests : requests).length === 0) {
    return (
      <Empty
        kind="request"
        message={`You haven't ${
          helpling ? 'accepted' : 'created'
        } any requests yet.\n${helpling ? 'Good on you!' : 'Care to help?'}`}
      />
    )
  }

  return <List items={helpling ? acceptedRequests : requests} kind="request" />
}
