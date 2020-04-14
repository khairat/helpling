import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { Spinner } from '../../components/common'
import { Empty, List } from '../../components/requests'
import { useRequests } from '../../hooks'
import { ProfileParamList } from '.'

interface Props {
  navigation: StackNavigationProp<ProfileParamList, 'MyOffers'>
  route: RouteProp<ProfileParamList, 'MyOffers'>
}

export const MyOffers: FunctionComponent<Props> = ({
  route: {
    params: { helpling, userId }
  }
}) => {
  const { items, loading, unsubscribe } = useRequests(
    'offers',
    userId,
    helpling
  )

  useEffect(
    () => () => {
      if (unsubscribe) {
        unsubscribe()
      }
    },
    [unsubscribe]
  )

  if (loading) {
    return <Spinner />
  }

  if (items.length === 0) {
    return (
      <Empty
        kind="offer"
        message={"You haven't created any offers yet.\nCare to help?"}
      />
    )
  }

  return <List items={items} kind="request" />
}
