import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { FlatList } from 'react-native'

import { img_profile } from '../../assets'
import { Separator } from '../../components/common'
import { MenuItem, User } from '../../components/profile'
import { browser, dialog } from '../../lib'
import { useAuth } from '../../store'
import { MenuItemType } from '../../types'
import { ProfileParamList } from '.'

interface Props {
  navigation: StackNavigationProp<ProfileParamList, 'Profile'>
  route: RouteProp<ProfileParamList, 'Profile'>
}

export const Profile: FunctionComponent<Props> = ({
  navigation: { navigate }
}) => {
  const [{ unloading, user }, { signOut }] = useAuth()

  const menu: MenuItemType[] = [
    {
      icon: img_profile.requests,
      label: 'My requests',
      onPress: () => {
        if (user) {
          navigate('MyRequests', {
            userId: user.id
          })
        }
      }
    },
    {
      icon: img_profile.offers,
      label: 'My offers',
      onPress: () => {
        if (user) {
          navigate('MyOffers', {
            userId: user.id
          })
        }
      }
    },
    {
      icon: img_profile.about,
      label: 'About',
      link: true,
      onPress: () => browser.open('https://helpling.app/about')
    },
    {
      icon: img_profile.privacy,
      label: 'Privacy policy',
      link: true,
      onPress: () => browser.open('https://helpling.app/privacy')
    },
    {
      icon: img_profile.signOut,
      label: 'Sign out',
      loading: unloading,
      onPress: async () => {
        const yes = await dialog.confirm(
          'Are you sure you want to sign out?',
          'Sign out',
          false
        )

        if (yes) {
          signOut()
        }
      }
    }
  ]

  return (
    <FlatList
      data={menu}
      ItemSeparatorComponent={Separator}
      keyExtractor={(item) => item.label}
      ListHeaderComponent={user ? <User user={user} /> : null}
      renderItem={({ item }) => <MenuItem item={item} />}
    />
  )
}
