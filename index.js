import * as Sentry from '@sentry/react-native'
import { AppRegistry, Platform, UIManager } from 'react-native'
import { SENTRY_DSN } from 'react-native-dotenv'

import { name } from './app.json'
import Helpling from './src'

Sentry.init({
  dsn: SENTRY_DSN
})

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

AppRegistry.registerComponent(name, () => Helpling)
