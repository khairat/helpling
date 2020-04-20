import React, { FunctionComponent, useEffect } from 'react'

import { Spinner } from '../../components/common'
import { List } from '../../components/requests'
import { useRequests, useUser } from '../../store'

export const Offers: FunctionComponent = () => {
  const [{ fetching, offers }, { fetchOffers }] = useRequests()
  const [{ user }] = useUser()

  useEffect(() => {
    if (user) {
      fetchOffers(user.city, user.country)
    }
  }, [fetchOffers, user])

  if (fetching) {
    return <Spinner />
  }

  return <List items={offers} kind="offer" showMeta />
}
