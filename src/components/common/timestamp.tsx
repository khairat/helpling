import moment from 'moment'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { AppState, Text, TextStyle } from 'react-native'

interface Props {
  style?: TextStyle
  time: string
}

export const Timestamp: FunctionComponent<Props> = ({ style, time }) => {
  const [label, setLabel] = useState<string>()

  useEffect(() => {
    const update = () => {
      setLabel(moment(time).fromNow())

      if (moment().diff(time, 'seconds') < 60) {
        setTimeout(() => update(), 3 * 1000)
      } else if (moment().diff(time, 'minutes') < 60) {
        setTimeout(() => update(), 60 * 1000)
      } else if (moment().diff(time, 'hours') < 25) {
        setTimeout(() => update(), 60 * 60 * 1000)
      }
    }

    update()

    const handler = () => setLabel(moment(time).fromNow())

    AppState.addEventListener('change', handler)

    return () => AppState.removeEventListener('change', handler)
  }, [time])

  return <Text style={style}>{label}</Text>
}
