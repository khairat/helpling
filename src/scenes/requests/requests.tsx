import React, { FunctionComponent, useEffect } from 'react'

import { Spinner } from '../../components/common'
import { List } from '../../components/requests'
import { config } from '../../lib'
import { useRequests, useUser } from '../../store'

export const Requests: FunctionComponent = () => {
  const [{ fetching, requests }, { fetchAll }] = useRequests()
  const [{ user }] = useUser()

  const onlyShowNearby = config.fetch('only_show_nearby') === 'enabled'

  useEffect(() => {
    if (user) {
      fetchAll('requests', user.city, user.country)
    }
  }, [fetchAll, user])

  if (fetching) {
    return <Spinner />
  }

  return (
    <List
      items={requests}
      kind="request"
      showFooter
      showHeader={onlyShowNearby}
    />
  )
}
