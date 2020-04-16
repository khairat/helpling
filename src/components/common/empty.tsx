import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { img_hero } from '../../assets'
import { colors, layout, typography } from '../../styles'
import { KindType } from '../../types'
import { Button } from './button'

interface Props {
  icon?: 'error' | 'messages'
  inverted?: boolean
  kind?: KindType
  message: string
}

export const Empty: FunctionComponent<Props> = ({
  icon,
  inverted,
  kind,
  message
}) => {
  const { navigate } = useNavigation()

  return (
    <View style={[styles.main, inverted && styles.inverted]}>
      <Image
        source={icon ? img_hero[icon] : img_hero.empty}
        style={styles.image}
      />
      <Text style={styles.message}>{message}</Text>
      {!!kind && (
        <Button
          label={`Create ${kind}`}
          onPress={() => {
            if (kind === 'offer') {
              navigate('Offers')

              // TOOD: fix hack
              setTimeout(() => navigate('CreateOffer'))
            } else {
              navigate('Requests')

              // TOOD: fix hack
              setTimeout(() => navigate('CreateRequest'))
            }
          }}
          style={styles.button}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: layout.margin
  },
  image: {
    height: layout.icon * 4,
    width: layout.icon * 4
  },
  inverted: {
    transform: [
      {
        scaleY: -1
      }
    ]
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin * 2
  },
  message: {
    ...typography.paragraph,
    color: colors.foreground,
    marginTop: layout.margin,
    textAlign: 'center'
  }
})
