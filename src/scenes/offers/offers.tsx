import React, { FunctionComponent } from 'react'

import { Spinner } from '../../components/common'
import { List } from '../../components/requests'
import { useRequests } from '../../hooks'

export const Offers: FunctionComponent = () => {
  const { items, loading } = useRequests('offers')

  if (loading) {
    return <Spinner />
  }

  return <List items={items} kind="offer" />
}
