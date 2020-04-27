import { useNavigation, useRoute } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import { Empty, Separator, Touchable } from '../../components/common'
import { useUser } from '../../store'
import { colors, layout, typography } from '../../styles'
import { KindType, RequestType } from '../../types'
import { ListItem } from './list-item'

interface Props {
  items: RequestType[]
  kind: KindType
  showFooter?: boolean
  showHeader?: boolean
}

export const List: FunctionComponent<Props> = ({
  items,
  kind,
  showFooter,
  showHeader
}) => {
  const { navigate } = useNavigation()
  const { name } = useRoute()

  const [{ user }] = useUser()

  return (
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
      ListFooterComponent={
        showFooter ? (
          <TouchableWithoutFeedback onPress={() => navigate('Profile')}>
            <View style={styles.footer}>
              <Text style={styles.message}>
                Can't find your {kind}s? Check your{' '}
                <Text style={styles.link}>profile</Text>.
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ) : null
      }
      ListHeaderComponent={
        showHeader && user ? (
          <View style={styles.header}>
            <Text style={styles.location}>
              {user.city}, {user.country}
            </Text>
          </View>
        ) : null
      }
      renderItem={({ item }) => (
        <Touchable
          onPress={() => {
            if (name.indexOf('My') === 0) {
              navigate(kind === 'offer' ? 'Offers' : 'Requests', {
                initial: false,
                params: {
                  id: item.id
                },
                screen: kind === 'offer' ? 'Offer' : 'Request'
              })
            } else {
              navigate(kind === 'offer' ? 'Offer' : 'Request', {
                id: item.id
              })
            }
          }}>
          <ListItem item={item} />
        </Touchable>
      )}
    />
  )
}

const styles = StyleSheet.create({
  footer: {
    borderTopColor: colors.border,
    borderTopWidth: layout.border * 2,
    padding: layout.margin
  },
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
  location: {
    ...typography.regular,
    ...typography.medium,
    color: colors.accent,
    textAlign: 'center'
  },
  message: {
    ...typography.small,
    color: colors.foregroundDark,
    textAlign: 'center'
  }
})
