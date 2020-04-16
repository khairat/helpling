import React, { FunctionComponent, useEffect } from 'react'

import { Spinner } from '../../components/common'
import { List } from '../../components/requests'
import { useRequests } from '../../hooks'

export const Requests: FunctionComponent = () => {
  const { items, loading, unsubscribe } = useRequests('requests')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => unsubscribe(), [])

  if (loading) {
    return <Spinner />
  }

  return <List items={items} kind="request" showHeader />
}
