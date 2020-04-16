import moment from 'moment'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { AppState, AppStateStatus, Text, TextStyle } from 'react-native'

interface Props {
  min?: boolean
  style?: TextStyle
  time: string
}

export const Timestamp: FunctionComponent<Props> = ({
  min = false,
  style,
  time
}) => {
  const [label, setLabel] = useState<string>()

  useEffect(() => {
    let timeout: number

    const update = () => {
      setLabel(moment(time).fromNow(min))

      if (moment().diff(time, 'seconds') < 60) {
        timeout = setTimeout(() => update(), 3 * 1000)
      } else if (moment().diff(time, 'minutes') < 60) {
        timeout = setTimeout(() => update(), 60 * 1000)
      } else if (moment().diff(time, 'hours') < 25) {
        timeout = setTimeout(() => update(), 60 * 60 * 1000)
      }
    }

    update()

    const handler = (state: AppStateStatus) => {
      if (state === 'active') {
        setLabel(moment(time).fromNow(min))
      }
    }

    AppState.addEventListener('change', handler)

    return () => {
      AppState.removeEventListener('change', handler)

      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [min, time])

  return <Text style={style}>{label}</Text>
}
