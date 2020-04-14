import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

import { img_ui_edit, img_ui_remove } from '../../assets'
import { Comments } from '../../components/comments'
import { Header, HeaderButton } from '../../components/common'
import { ListItem } from '../../components/requests'
import { useActions } from '../../hooks'
import { dialog } from '../../lib'
import { useAuth } from '../../store'
import { colors, layout } from '../../styles'
import { OffersParamList } from '.'

interface Props {
  navigation: StackNavigationProp<OffersParamList, 'Offer'>
  route: RouteProp<OffersParamList, 'Offer'>
}

export const Offer: FunctionComponent<Props> = ({
  navigation: { navigate, pop, setOptions },
  route: {
    params: { offer }
  }
}) => {
  const [{ user }] = useAuth()

  const { remove, removing } = useActions('offers')

  useEffect(() => {
    setOptions({
      header: (props) => (
        <Header
          {...props}
          right={
            removing ? (
              <ActivityIndicator color={colors.accent} style={styles.spinner} />
            ) : user?.id === offer.user.id ? (
              <>
                <HeaderButton
                  icon={img_ui_edit}
                  onPress={() => {
                    navigate('EditOffer', {
                      offer
                    })
                  }}
                />
                <HeaderButton
                  icon={img_ui_remove}
                  onPress={async () => {
                    const yes = await dialog.confirm(
                      'Are you sure you want to remove this offer?',
                      'Remove offer',
                      false
                    )

                    if (yes) {
                      await remove(offer.id)

                      pop()
                    }
                  }}
                />
              </>
            ) : undefined
          }
        />
      )
    })
  }, [navigate, offer, pop, remove, removing, setOptions, user])

  return (
    <>
      <ListItem item={offer} />
      <Comments itemId={offer.id} />
    </>
  )
}

const styles = StyleSheet.create({
  spinner: {
    margin: layout.margin
  }
})
