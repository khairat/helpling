import React, { FunctionComponent, useEffect } from 'react'

import { Spinner } from '../../components/common'
import { List } from '../../components/requests'
import { config } from '../../lib'
import { useRequests, useUser } from '../../store'

export const Offers: FunctionComponent = () => {
  const [{ fetching, offers }, { fetchAll }] = useRequests()
  const [{ user }] = useUser()

  const onlyShowNearby = config.fetch('only_show_nearby') === 'enabled'

  useEffect(() => {
    if (user) {
      fetchAll('offers', user.city, user.country)
    }
  }, [fetchAll, user])

  if (fetching) {
    return <Spinner />
  }

  return (
    <List items={offers} kind="offer" showFooter showHeader={onlyShowNearby} />
  )
}
