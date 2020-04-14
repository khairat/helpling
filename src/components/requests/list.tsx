import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { Separator } from '../../components/common'
import { Request } from '../../types'
import { Item } from './item'

interface Props {
  items: Request[]
}

export const List: FunctionComponent<Props> = ({ items }) => (
  <FlatList
    data={items}
    ItemSeparatorComponent={Separator}
    renderItem={({ item }) => <Item item={item} />}
  />
)
