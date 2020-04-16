import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { Header } from '../../components/common'
import { layout } from '../../styles'
import { ThreadType } from '../../types'
import { Messages } from './messages'
import { Thread } from './thread'

export type MessagesParamList = {
  Messages: undefined
  Thread: {
    thread: ThreadType
  }
}

const { Navigator, Screen } = createStackNavigator<MessagesParamList>()

export const MessagesNavigator: FunctionComponent = () => {
  const { top } = useSafeArea()

  const headerStyle = {
    height: layout.header + top
  }

  return (
    <Navigator>
      <Screen
        component={Messages}
        name="Messages"
        options={{
          header: (props) => <Header {...props} />,
          headerStyle,
          title: 'Messages'
        }}
      />
      <Screen
        component={Thread}
        name="Thread"
        options={{
          header: (props) => <Header {...props} />,
          headerStyle,
          title: 'Thread'
        }}
      />
    </Navigator>
  )
}
