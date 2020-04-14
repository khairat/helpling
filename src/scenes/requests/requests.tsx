import React, { FunctionComponent, useEffect } from 'react'

import { Spinner } from '../../components/common'
import { List } from '../../components/requests'
import { useRequests } from '../../hooks'

export const Requests: FunctionComponent = () => {
  const { items, loading, unsubscribe } = useRequests('requests')

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

  return <List items={items} kind="request" showHeader />
}
