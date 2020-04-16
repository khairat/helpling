import { useNavigation } from '@react-navigation/native'
import { StackHeaderProps } from '@react-navigation/stack'
import { startCase } from 'lodash'
import React, { FunctionComponent, useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

import {
  img_ui_accept,
  img_ui_edit,
  img_ui_messages,
  img_ui_remove
} from '../../assets'
import { useActions } from '../../hooks'
import { dialog, helpers } from '../../lib'
import { useAuth } from '../../store'
import { colors, layout } from '../../styles'
import { RequestType } from '../../types'
import { Header, HeaderButton } from '../common'

interface Props {
  header: StackHeaderProps
  item?: RequestType
  kind: 'offer' | 'request'

  onPress?: () => void
}

export const Actions: FunctionComponent<Props> = ({ header, item, kind }) => {
  const { goBack, navigate, setParams } = useNavigation()

  const [{ user }] = useAuth()

  const [loading, setLoading] = useState(false)

  const {
    accept,
    accepting,
    complete,
    completing,
    creating,
    remove,
    removing,
    updating
  } = useActions(kind === 'offer' ? 'offers' : 'requests')

  const right = () => {
    const getThreadButton = (id: string) => {
      if (loading) {
        return (
          <ActivityIndicator color={colors.accent} style={styles.spinner} />
        )
      }

      return (
        <HeaderButton
          icon={img_ui_messages}
          onPress={async () => {
            setLoading(true)

            const thread = await helpers.fetchThread(id)

            setLoading(false)

            navigate('Messages')

            // TODO: fix hack
            setTimeout(() =>
              navigate('Thread', {
                thread
              })
            )
          }}
        />
      )
    }

    if (accepting || completing || creating || removing || updating) {
      return <ActivityIndicator color={colors.accent} style={styles.spinner} />
    }

    if (item && item.status === 'pending' && item.user.id === user?.id) {
      return (
        <>
          <HeaderButton
            icon={img_ui_edit}
            onPress={() =>
              navigate(kind === 'offer' ? 'EditOffer' : 'EditRequest', {
                [kind]: item
              })
            }
          />
          <HeaderButton
            icon={img_ui_remove}
            onPress={async () => {
              const yes = await dialog.confirm(
                `Are you sure you want to remove this ${kind}?`,
                `Remove ${kind}`,
                false
              )

              if (yes) {
                await remove(item.id)

                goBack()
              }
            }}
          />
        </>
      )
    }

    if (item && item.status !== 'completed' && item.user.id !== user?.id) {
      return (
        <>
          {(item.user.id === user?.id || item.helpling?.id === user?.id) &&
            item.threadId &&
            getThreadButton(item.threadId)}
          <HeaderButton
            icon={img_ui_accept}
            onPress={async () => {
              const action = item.status === 'pending' ? 'accept' : 'complete'

              const yes = await dialog.confirm(
                `Are you sure you want to ${action} this ${kind}?`,
                `${startCase(action)} ${kind}`
              )

              if (yes) {
                const success = await (action === 'accept' ? accept : complete)(
                  item.id,
                  kind
                )

                if (!success) {
                  return
                }

                setParams({
                  [kind]: {
                    ...item,
                    status: action === 'accept' ? 'accepted' : 'completed'
                  }
                })

                if (action === 'accept') {
                  navigate('Messages')

                  // TODO: remove hack
                  setTimeout(() =>
                    navigate('Thread', {
                      thread: success
                    })
                  )
                }
              }
            }}
          />
        </>
      )
    }

    if (
      item &&
      (item.user.id === user?.id || item.helpling?.id === user?.id) &&
      item.threadId
    ) {
      return getThreadButton(item.threadId)
    }
  }

  return <Header {...header} right={right()} />
}

const styles = StyleSheet.create({
  spinner: {
    margin: layout.margin
  }
})
