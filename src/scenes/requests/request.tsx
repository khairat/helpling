import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

import { img_ui_check, img_ui_edit, img_ui_remove } from '../../assets'
import { Comments } from '../../components/comments'
import { Header, HeaderButton } from '../../components/common'
import { ListItem } from '../../components/requests'
import { useActions } from '../../hooks'
import { dialog } from '../../lib'
import { useAuth } from '../../store'
import { colors, layout } from '../../styles'
import { RequestsParamList } from '.'

interface Props {
  navigation: StackNavigationProp<RequestsParamList, 'Request'>
  route: RouteProp<RequestsParamList, 'Request'>
}

export const Request: FunctionComponent<Props> = ({
  navigation: { navigate, pop, setOptions, setParams },
  route: {
    params: { request }
  }
}) => {
  const [{ user }] = useAuth()

  const { accept, accepting, remove, removing } = useActions('requests')

  useEffect(() => {
    setOptions({
      header: (props) => (
        <Header
          {...props}
          right={
            accepting || removing ? (
              <ActivityIndicator color={colors.accent} style={styles.spinner} />
            ) : user?.id === request.user.id ? (
              <>
                <HeaderButton
                  icon={img_ui_edit}
                  onPress={() => {
                    navigate('EditRequest', {
                      request
                    })
                  }}
                />
                <HeaderButton
                  icon={img_ui_remove}
                  onPress={async () => {
                    const yes = await dialog.confirm(
                      'Are you sure you want to remove this request?',
                      'Remove request',
                      false
                    )

                    if (yes) {
                      await remove(request.id)

                      pop()
                    }
                  }}
                />
              </>
            ) : request.status === 'pending' ? (
              <HeaderButton
                icon={img_ui_check}
                onPress={async () => {
                  const yes = await dialog.confirm(
                    'Are you sure you want to accept this request?',
                    'Accept request'
                  )

                  if (yes) {
                    await accept(request.id, 'request')

                    setParams({
                      request: {
                        ...request,
                        status: 'accepted'
                      }
                    })
                  }
                }}
              />
            ) : undefined
          }
        />
      )
    })
  }, [
    accept,
    accepting,
    navigate,
    pop,
    remove,
    removing,
    request,
    setOptions,
    setParams,
    user
  ])

  return (
    <>
      <ListItem item={request} />
      <Comments itemId={request.id} />
    </>
  )
}

const styles = StyleSheet.create({
  spinner: {
    margin: layout.margin
  }
})
