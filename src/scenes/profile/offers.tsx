import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'

import { Empty, Spinner } from '../../components/common'
import { List } from '../../components/requests'
import { useUser } from '../../store'
import { ProfileParamList } from '.'

interface Props {
  navigation: StackNavigationProp<ProfileParamList, 'MyOffers'>
  route: RouteProp<ProfileParamList, 'MyOffers'>
}

export const MyOffers: FunctionComponent<Props> = ({
  route: {
    params: { helpling }
  }
}) => {
  const [
    { acceptedOffers, fetching, offers },
    { fetchAcceptedOffers, fetchOffers }
  ] = useUser()

  useEffect(() => {
    if (helpling) {
      fetchAcceptedOffers()
    } else {
      fetchOffers()
    }
  }, [fetchAcceptedOffers, fetchOffers, helpling])

  if (fetching) {
    return <Spinner />
  }

  if ((helpling ? acceptedOffers : offers).length === 0) {
    return (
      <Empty
        kind="request"
        message={"You haven't created any offers yet.\nGood on you!"}
      />
    )
  }

  return <List items={helpling ? acceptedOffers : offers} kind="offer" />
}
