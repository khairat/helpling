import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { SectionList, SectionListData } from 'react-native'

import { img_profile } from '../../assets'
import { Separator } from '../../components/common'
import { MenuHeader, MenuItem, User } from '../../components/profile'
import { browser, dialog } from '../../lib'
import { useAuth, useRequests, useThreads, useUser } from '../../store'
import { MenuItemType } from '../../types'
import { ProfileParamList } from '.'

interface Props {
  navigation: StackNavigationProp<ProfileParamList, 'Profile'>
  route: RouteProp<ProfileParamList, 'Profile'>
}

export const Profile: FunctionComponent<Props> = ({
  navigation: { navigate }
}) => {
  const [{ signingOut }, { signOut }] = useAuth()
  const [{ user }, { cleanUpUser }] = useUser()
  const [, { cleanUpRequests }] = useRequests()
  const [, { cleanUpThreads }] = useThreads()

  const menu: SectionListData<MenuItemType>[] = [
    {
      data: [
        {
          icon: img_profile.requests,
          label: "Requests I've created",
          onPress: () =>
            navigate('MyRequests', {
              helpling: false
            })
        },
        {
          icon: img_profile.requests,
          label: "Requests I've accepted",
          onPress: () =>
            navigate('MyRequests', {
              helpling: true
            })
        }
      ],
      title: 'Requests'
    },
    {
      data: [
        {
          icon: img_profile.offers,
          label: "Offers I've created",
          onPress: () =>
            navigate('MyOffers', {
              helpling: false
            })
        },
        {
          icon: img_profile.offers,
          label: "Offers I've accepted",
          onPress: () =>
            navigate('MyOffers', {
              helpling: true
            })
        }
      ],
      title: 'Offers'
    },
    {
      data: [
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
        }
      ],
      title: 'Helpling'
    },
    {
      data: [
        {
          icon: img_profile.signOut,
          label: 'Sign out',
          loading: signingOut,
          onPress: async () => {
            const yes = await dialog.confirm(
              'Are you sure you want to sign out?',
              'Sign out',
              false
            )

            if (yes) {
              cleanUpRequests()
              cleanUpThreads()
              cleanUpUser()

              signOut()
            }
          }
        }
      ],
      title: 'Account'
    }
  ]

  return (
    <SectionList
      ItemSeparatorComponent={Separator}
      keyExtractor={(item) => item.label}
      ListHeaderComponent={user ? <User user={user} /> : null}
      renderItem={({ item }) => <MenuItem item={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <MenuHeader title={title} />
      )}
      sections={menu}
    />
  )
}
