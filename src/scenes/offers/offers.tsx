import React, { FunctionComponent, useEffect } from 'react'

import { Spinner } from '../../components/common'
import { List } from '../../components/requests'
import { useRequests } from '../../store'

export const Offers: FunctionComponent = () => {
  const [{ fetching, offers }, { fetchOffers }] = useRequests()

  useEffect(() => {
    fetchOffers()
  }, [fetchOffers])

  if (fetching) {
    return <Spinner />
  }

  return <List items={offers} kind="offer" showHeader />
}
