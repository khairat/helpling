import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { Spinner } from '../../components/common'
import { Empty, List } from '../../components/requests'
import { useRequests } from '../../hooks'
import { ProfileParamList } from '.'

interface Props {
  navigation: StackNavigationProp<ProfileParamList, 'MyRequests'>
  route: RouteProp<ProfileParamList, 'MyRequests'>
}

export const MyRequests: FunctionComponent<Props> = ({
  route: {
    params: { userId }
  }
}) => {
  const { items, loading, unsubscribe } = useRequests('requests', userId)

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
        kind="request"
        message={"You haven't created any requests yet.\nGood on you!"}
      />
    )
  }

  return <List items={items} kind="request" />
}
