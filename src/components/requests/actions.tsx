import { useNavigation } from '@react-navigation/native'
import { StackHeaderProps } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'

import {
  img_ui_accept,
  img_ui_edit,
  img_ui_messages,
  img_ui_offer,
  img_ui_remove,
  img_ui_request,
  img_ui_share
} from '../../assets'
import { dialog, sharing } from '../../lib'
import { useRequests, useUser } from '../../store'
import { RequestType } from '../../types'
import {
  Header,
  HeaderButton,
  HeaderButtonGroup,
  HeaderSpinner
} from '../common'

interface Props {
  header: StackHeaderProps
  item: RequestType
  kind: 'offer' | 'request'

  onPress?: () => void
}

export const Actions: FunctionComponent<Props> = ({ header, item, kind }) => {
  const { goBack, navigate, setParams } = useNavigation()

  const [{ user }] = useUser()

  const [
    { accepting, completing, creating, removing, updating },
    { accept, complete, remove }
  ] = useRequests()

  const right = () => {
    const getShareButton = () => (
      <HeaderButton
        icon={img_ui_share}
        label="Share"
        onPress={() => sharing.share(kind, item)}
      />
    )

    const getThreadButton = (id: string) => (
      <HeaderButton
        icon={img_ui_messages}
        label={`Talk to ${
          item.user.id === user?.id ? item.helpling?.name : item.user.name
        }`}
        onPress={() =>
          navigate('Messages', {
            initial: false,
            params: {
              id
            },
            screen: 'Thread'
          })
        }
      />
    )

    if (accepting || completing || creating || removing || updating) {
      return <HeaderSpinner />
    }

    if (item.status === 'pending' && item.user.id === user?.id) {
      return (
        <HeaderButtonGroup>
          {getShareButton()}
          <HeaderButton
            icon={img_ui_edit}
            label="Edit"
            onPress={() =>
              navigate(kind === 'offer' ? 'EditOffer' : 'EditRequest', {
                id: item.id
              })
            }
          />
          <HeaderButton
            icon={img_ui_remove}
            label="Delete"
            onPress={async () => {
              const yes = await dialog.confirm(
                `Are you sure you want to remove this ${kind}?`,
                `Remove ${kind}`,
                false
              )

              if (yes) {
                await remove(kind === 'offer' ? 'offers' : 'requests', item.id)

                goBack()
              }
            }}
          />
        </HeaderButtonGroup>
      )
    }

    if (item.status !== 'completed' && item.user.id !== user?.id) {
      const title =
        item.status === 'pending'
          ? kind === 'offer'
            ? 'Accept offer'
            : 'Offer to help'
          : `Finish ${kind}`

      return (
        <HeaderButtonGroup>
          {getShareButton()}
          {(item.user.id === user?.id || item.helpling?.id === user?.id) &&
            item.threadId &&
            getThreadButton(item.threadId)}
          <HeaderButton
            icon={
              item.status === 'pending'
                ? kind === 'offer'
                  ? img_ui_offer
                  : img_ui_request
                : img_ui_accept
            }
            label={title}
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
                item.status === 'pending'
                  ? kind === 'offer'
                    ? `Are you sure you want to accept ${item.user.name}'s offer for help?`
                    : `Are you sure you want to offer help to ${item.user.name}?`
                  : `Are you sure you want to finish this ${kind}?`,
                title
              )

              if (yes) {
                const success = await (action === 'accept' ? accept : complete)(
                  kind,
                  item.id
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
                  navigate('Messages', {
                    initial: false,
                    params: {
                      id: success
                    },
                    screen: 'Thread'
                  })
                }
              }
            }}
          />
        </HeaderButtonGroup>
      )
    }

    if (
      (item.user.id === user?.id || item.helpling?.id === user?.id) &&
      item.threadId
    ) {
      return (
        <HeaderButtonGroup>
          {getShareButton()}
          {getThreadButton(item.threadId)}
        </HeaderButtonGroup>
      )
    }
  }

  return <Header {...header} right={right()} />
}
