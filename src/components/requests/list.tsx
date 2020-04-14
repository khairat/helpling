import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { Separator, Touchable } from '../../components/common'
import { KindType, RequestType } from '../../types'
import { ListItem } from './list-item'

interface Props {
  items: RequestType[]
  kind: KindType
}

export const List: FunctionComponent<Props> = ({ items, kind }) => {
  const { navigate } = useNavigation()

  return (
    <FlatList
      data={items}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => (
        <Touchable
          onPress={() => {
            if (kind === 'offer') {
              navigate('Offer', {
                offer: item
              })
            } else {
              navigate('Request', {
                request: item
              })
            }
          }}>
          <ListItem item={item} />
        </Touchable>
      )}
    />
  )
}
