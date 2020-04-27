import remoteConfig from '@react-native-firebase/remote-config'

class Config {
  async init(): Promise<void> {
    await remoteConfig().setConfigSettings({
      isDeveloperModeEnabled: __DEV__
    })

    await remoteConfig().fetchAndActivate()
  }

  fetch(key: string): string | number | boolean | undefined {
    const { value } = remoteConfig().getValue(key)

    return value
  }
}

export const config = new Config()
