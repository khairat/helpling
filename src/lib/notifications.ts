import messaging from '@react-native-firebase/messaging'

import { nav } from './nav'

class Notifications {
  async init(): Promise<void> {
    await messaging().registerDeviceForRemoteMessages()
    await messaging().requestPermission()

    messaging().onNotificationOpenedApp((message) =>
      nav.handleDeepLink(message?.data?.deeplink)
    )
  }

  async subscribeToTopic(userId: string): Promise<void> {
    await messaging().subscribeToTopic(`user_${userId}`)
  }

  async unsubscribeFromTopic(userId: string): Promise<void> {
    await messaging().unsubscribeFromTopic(`user_${userId}`)
  }

  getInitial() {
    return messaging().getInitialNotification()
  }
}

export const notifications = new Notifications()
