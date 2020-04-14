import { AppRegistry, Platform, UIManager } from 'react-native'

import { name } from './app.json'
import { Helpling } from './src'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

AppRegistry.registerComponent(name, () => Helpling)
