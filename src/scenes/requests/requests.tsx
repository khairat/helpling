import React, { FunctionComponent } from 'react'

import { Spinner } from '../../components/common'
import { List } from '../../components/requests'
import { useRequests } from '../../hooks'

export const Requests: FunctionComponent = () => {
  const { loading, requests } = useRequests()

  if (loading) {
    return <Spinner />
  }

  return <List items={requests} />
}
