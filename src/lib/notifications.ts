import messaging from '@react-native-firebase/messaging'

class Notifications {
  async init(): Promise<void> {
    await messaging().registerDeviceForRemoteMessages()
    await messaging().requestPermission()
  }

  async subscribe(userId: string): Promise<void> {
    await messaging().subscribeToTopic(`user_${userId}`)
  }

  async unsubscribe(userId: string): Promise<void> {
    await messaging().unsubscribeFromTopic(`user_${userId}`)
  }

  getInitial() {
    return messaging().getInitialNotification()
  }
}

export const notifications = new Notifications()
