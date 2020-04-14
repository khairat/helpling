import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { Separator, Touchable } from '../../components/common'
import { ListItem } from '../../components/requests'
import { RequestType } from '../../types'

interface Props {
  items: RequestType[]
}

export const List: FunctionComponent<Props> = ({ items }) => {
  const { navigate } = useNavigation()

  return (
    <FlatList
      data={items}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => (
        <Touchable
          onPress={() =>
            navigate('Request', {
              request: item
            })
          }>
          <ListItem item={item} />
        </Touchable>
      )}
    />
  )
}
