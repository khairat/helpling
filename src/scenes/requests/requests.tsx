import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native-gesture-handler'

import { Separator, Spinner } from '../../components/common'
import { ListItem } from '../../components/requests'
import { useRequests } from '../../hooks'

export const Requests: FunctionComponent = () => {
  const { loading, requests } = useRequests()

  if (loading) {
    return <Spinner />
  }

  return (
    <FlatList
      data={requests}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => <ListItem item={item} />}
    />
  )
}
