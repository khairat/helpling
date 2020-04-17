import { useNavigation } from '@react-navigation/native'
import { StackHeaderProps } from '@react-navigation/stack'
import { startCase } from 'lodash'
import React, { FunctionComponent } from 'react'

import {
  img_ui_accept,
  img_ui_edit,
  img_ui_messages,
  img_ui_remove
} from '../../assets'
import { dialog, nav } from '../../lib'
import { useRequests, useUser } from '../../store'
import { RequestType } from '../../types'
import { Header, HeaderButton, HeaderSpinner } from '../common'

interface Props {
  header: StackHeaderProps
  item?: RequestType
  kind: 'offer' | 'request'

  onPress?: () => void
}

export const Actions: FunctionComponent<Props> = ({ header, item, kind }) => {
  const { goBack, setParams } = useNavigation()

  const [{ user }] = useUser()

  const [
    { accepting, completing, creating, removing, updating },
    { acceptRequest, completeRequest, removeRequest }
  ] = useRequests()

  const right = () => {
    const getThreadButton = (id: string) => (
      <HeaderButton
        icon={img_ui_messages}
        onPress={() =>
          nav.navigateAway('Messages', 'Thread', {
            id
          })
        }
      />
    )

    if (accepting || completing || creating || removing || updating) {
      return <HeaderSpinner />
    }

    if (item && item.status === 'pending' && item.user.id === user?.id) {
      return (
        <>
          <HeaderButton
            icon={img_ui_edit}
            onPress={() =>
              nav.navigate(kind === 'offer' ? 'EditOffer' : 'EditRequest', {
                id: item.id
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
                await removeRequest(
                  kind === 'offer' ? 'offers' : 'requests',
                  item.id
                )

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
              const action =
                item.status === 'pending'
                  ? 'accept'
                  : item.status === 'accepted'
                  ? 'complete'
                  : 'none'

              if (action === 'none') {
                return
              }

              const yes = await dialog.confirm(
                `Are you sure you want to ${action} this ${kind}?`,
                `${startCase(action)} ${kind}`
              )

              if (yes) {
                const success = await (action === 'accept'
                  ? acceptRequest
                  : completeRequest)(kind, item.id)

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
                  nav.navigateAway('Messages', 'Thread', {
                    id: success
                  })
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
