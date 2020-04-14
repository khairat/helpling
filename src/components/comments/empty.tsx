import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { img_hero_empty } from '../../assets'
import { colors, layout, typography } from '../../styles'

export const Empty: FunctionComponent = () => (
  <View style={styles.main}>
    <Image source={img_hero_empty} style={styles.image} />
    <Text style={styles.message}>
      No comments yet.{'\n'}Be the first to write one.
    </Text>
  </View>
)

const styles = StyleSheet.create({
  image: {
    height: layout.icon * 4,
    width: layout.icon * 4
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin * 2,
    transform: [
      {
        scaleY: -1
      }
    ]
  },
  message: {
    ...typography.paragraph,
    color: colors.foreground,
    marginTop: layout.margin,
    textAlign: 'center'
  }
})
