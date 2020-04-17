import React, { FunctionComponent } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import { Empty, Separator, Touchable } from '../../components/common'
import { nav } from '../../lib'
import { colors, layout, typography } from '../../styles'
import { KindType, RequestType } from '../../types'
import { ListItem } from './list-item'

interface Props {
  items: RequestType[]
  kind: KindType
  showHeader?: boolean
}

export const List: FunctionComponent<Props> = ({ items, kind, showHeader }) => (
  <FlatList
    contentContainerStyle={styles.list}
    data={items}
    ItemSeparatorComponent={Separator}
    ListEmptyComponent={
      <Empty
        kind={kind}
        message={
          kind === 'offer'
            ? 'There are no offers right now.\nCare to help?'
            : 'There are no requests right now.\nEveryone is warm and fed!'
        }
      />
    }
    ListHeaderComponent={
      showHeader ? (
        <TouchableWithoutFeedback onPress={() => nav.navigate('Profile')}>
          <View style={styles.header}>
            <Text style={styles.message}>
              Can't find your {kind}s? Check your{' '}
              <Text style={styles.link}>profile</Text>.
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ) : null
    }
    renderItem={({ item }) => (
      <Touchable
        onPress={() =>
          nav.navigateAway(
            kind === 'offer' ? 'Offers' : 'Requests',
            kind === 'offer' ? 'Offer' : 'Request',
            {
              id: item.id
            }
          )
        }>
        <ListItem item={item} />
      </Touchable>
    )}
  />
)

const styles = StyleSheet.create({
  header: {
    borderBottomColor: colors.border,
    borderBottomWidth: layout.border * 2,
    padding: layout.margin
  },
  link: {
    color: colors.accent
  },
  list: {
    flexGrow: 1
  },
  message: {
    ...typography.small,
    color: colors.foregroundDark,
    textAlign: 'center'
  }
})
