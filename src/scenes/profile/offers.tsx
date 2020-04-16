import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { Empty, Spinner } from '../../components/common'
import { List } from '../../components/requests'
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => unsubscribe(), [])

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

  return <List items={items} kind="offer" />
}
