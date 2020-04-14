import InAppBrowser from 'react-native-inappbrowser-reborn'

class Browser {
  async open(uri: string): Promise<void> {
    const available = await InAppBrowser.isAvailable()

    if (available) {
      await InAppBrowser.open(uri)
    }
  }
}

export const browser = new Browser()
