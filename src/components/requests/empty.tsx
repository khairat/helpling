import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { img_hero_error } from '../../assets'
import { colors, layout, typography } from '../../styles'
import { KindType } from '../../types'
import { Button } from '../common'

interface Props {
  kind: KindType
  message: string
}

export const Empty: FunctionComponent<Props> = ({ kind, message }) => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.main}>
      <Image source={img_hero_error} style={styles.image} />
      <Text style={styles.message}>{message}</Text>
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
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: layout.header * 2,
    width: layout.header * 2
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
    marginVertical: layout.margin,
    textAlign: 'center'
  }
})
