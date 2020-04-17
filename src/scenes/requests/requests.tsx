import React, { FunctionComponent, useEffect } from 'react'

import { Spinner } from '../../components/common'
import { List } from '../../components/requests'
import { useRequests } from '../../store'

export const Requests: FunctionComponent = () => {
  const [{ fetching, requests }, { fetchRequests }] = useRequests()

  useEffect(() => {
    fetchRequests()
  }, [fetchRequests])

  if (fetching) {
    return <Spinner />
  }

  return <List items={requests} kind="request" showHeader />
}
