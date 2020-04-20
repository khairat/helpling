import React, { FunctionComponent, useEffect } from 'react'

import { Spinner } from '../../components/common'
import { List } from '../../components/requests'
import { useRequests, useUser } from '../../store'

export const Requests: FunctionComponent = () => {
  const [{ fetching, requests }, { fetchRequests }] = useRequests()
  const [{ user }] = useUser()

  useEffect(() => {
    if (user) {
      fetchRequests(user.city, user.country)
    }
  }, [fetchRequests, user])

  if (fetching) {
    return <Spinner />
  }

  return <List items={requests} kind="request" showMeta />
}
