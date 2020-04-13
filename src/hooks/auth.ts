import AppleSignIn, {
  AppleAuthCredentialState,
  AppleAuthRequestOperation,
  AppleAuthRequestScope
} from '@invertase/react-native-apple-authentication'
import { GoogleSignin } from '@react-native-community/google-signin'
import firebase from '@react-native-firebase/auth'
import { useEffect, useState } from 'react'

export const useAuth = (init?: boolean) => {
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setLoggedIn] = useState(false)

  const [signingInWithApple, setSigningInWithApple] = useState(false)
  const [signingInWithGoogle, setSigningInWithGoogle] = useState(false)

  useEffect(() => {
    if (init) {
      const unsubscribe = firebase().onAuthStateChanged((user) => {
        setLoggedIn(!!user)

        setLoading(false)
      })

      return () => unsubscribe()
    }
  }, [init])

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
        const credential = firebase.AppleAuthProvider.credential(
          identityToken,
          nonce
        )

        await firebase().signInWithCredential(credential)
      }
    } finally {
      setSigningInWithApple(false)
    }
  }

  const signInWithGoogle = async () => {
    if (signingInWithApple || signingInWithGoogle) {
      return
    }

    setSigningInWithGoogle(true)

    try {
      GoogleSignin.configure()

      const { idToken } = await GoogleSignin.signIn()

      const googleCredential = firebase.GoogleAuthProvider.credential(idToken)

      await firebase().signInWithCredential(googleCredential)
    } finally {
      setSigningInWithGoogle(false)
    }
  }

  return {
    isLoggedIn,
    loading,
    signInWithApple,
    signInWithGoogle,
    signingInWithApple,
    signingInWithGoogle
  }
}
