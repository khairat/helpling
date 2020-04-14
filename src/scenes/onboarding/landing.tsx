import React, { FunctionComponent } from 'react'
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'

import { img_auth_apple, img_auth_google, img_helpling } from '../../assets'
import { Touchable } from '../../components/common'
import { useOnboarding } from '../../hooks'
import { colors, layout, typography } from '../../styles'

export const Landing: FunctionComponent = () => {
  const { bottom } = useSafeArea()

  const {
    signInWithApple,
    signInWithGoogle,
    signingInWithApple,
    signingInWithGoogle
  } = useOnboarding()

  return (
    <>
      <View style={styles.main}>
        <Image source={img_helpling} style={styles.logo} />
        <Text style={styles.title}>Helpling</Text>
        <Text style={styles.description}>
          Find people who need your help and help them.
        </Text>
      </View>
      <View
        style={[
          styles.footer,
          {
            marginBottom: bottom
          }
        ]}>
        {Platform.OS === 'ios' && (
          <Touchable onPress={() => signInWithApple()} style={styles.button}>
            {signingInWithApple ? (
              <ActivityIndicator color="#000" />
            ) : (
              <>
                <Image source={img_auth_apple} style={styles.buttonIcon} />
                <Text style={styles.buttonLabel}>Sign in with Apple</Text>
              </>
            )}
          </Touchable>
        )}
        <Touchable onPress={() => signInWithGoogle()} style={styles.button}>
          {signingInWithGoogle ? (
            <ActivityIndicator color="#000" />
          ) : (
            <>
              <Image source={img_auth_google} style={styles.buttonIcon} />
              <Text style={styles.buttonLabel}>Sign in with Google</Text>
            </>
          )}
        </Touchable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: layout.radius,
    flexDirection: 'row',
    height: layout.button,
    justifyContent: 'center',
    marginTop: layout.margin,
    paddingHorizontal: layout.margin
  },
  buttonIcon: {
    height: layout.icon,
    marginRight: layout.padding,
    width: layout.icon
  },
  buttonLabel: {
    ...typography.regular,
    ...typography.medium,
    color: '#000'
  },
  description: {
    ...typography.small,
    color: colors.foreground,
    marginTop: layout.padding,
    textAlign: 'center'
  },
  footer: {
    padding: layout.margin,
    paddingTop: 0
  },
  logo: {
    height: layout.logo,
    width: layout.logo
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin * 2
  },
  title: {
    ...typography.title,
    color: colors.foreground,
    marginTop: layout.margin
  }
})
