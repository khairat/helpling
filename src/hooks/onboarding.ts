import AppleSignIn, {
  AppleAuthCredentialState,
  AppleAuthRequestOperation,
  AppleAuthRequestScope
} from '@invertase/react-native-apple-authentication'
import { GoogleSignin } from '@react-native-community/google-signin'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { FIREBASE_WEB_CLIENT_ID } from 'react-native-dotenv'

import { useUser } from '../store'

export const useOnboarding = () => {
  const { navigate } = useNavigation()

  const [, { fetchUser }] = useUser()

  const [onboarding, setOnboarding] = useState(false)
  const [signingInWithApple, setSigningInWithApple] = useState(false)
  const [signingInWithGoogle, setSigningInWithGoogle] = useState(false)

  const signInWithApple = async () => {
    if (signingInWithApple || signingInWithGoogle) {
      return
    }

    setSigningInWithApple(true)

    try {
      const { identityToken, nonce, user } = await AppleSignIn.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL]
      })

      const state = await AppleSignIn.getCredentialStateForUser(user)

      if (state === AppleAuthCredentialState.AUTHORIZED) {
        const credential = auth.AppleAuthProvider.credential(
          identityToken,
          nonce
        )

        const response = await auth().signInWithCredential(credential)

        await handleUser(response)
      }
    } catch (error) {
      setSigningInWithApple(false)
    }
  }

  const signInWithGoogle = async () => {
    if (signingInWithApple || signingInWithGoogle) {
      return
    }

    setSigningInWithGoogle(true)

    try {
      GoogleSignin.configure({
        webClientId: FIREBASE_WEB_CLIENT_ID
      })

      const { idToken } = await GoogleSignin.signIn()

      const googleCredential = auth.GoogleAuthProvider.credential(idToken)

      const response = await auth().signInWithCredential(googleCredential)

      await handleUser(response)
    } catch (error) {
      setSigningInWithGoogle(false)
    }
  }

  const completeOnboarding = async (
    id: string,
    name: string,
    country: string,
    city: string
  ) => {
    setOnboarding(true)

    try {
      await firestore().collection('users').doc(id).set({
        city,
        country,
        createdAt: new Date(),
        id,
        name
      })
    } finally {
      setOnboarding(false)
    }
  }

  const handleUser = async ({
    additionalUserInfo,
    user: { uid }
  }: FirebaseAuthTypes.UserCredential) => {
    if (additionalUserInfo?.isNewUser) {
      navigate('Onboarding', {
        userId: uid
      })
    } else {
      const doc = await firestore().collection('users').doc(uid).get()

      if (doc.exists) {
        await fetchUser()
      } else {
        navigate('Onboarding', {
          userId: uid
        })
      }
    }

    setSigningInWithApple(false)
    setSigningInWithGoogle(false)
  }

  return {
    completeOnboarding,
    onboarding,
    signInWithApple,
    signInWithGoogle,
    signingInWithApple,
    signingInWithGoogle
  }
}
