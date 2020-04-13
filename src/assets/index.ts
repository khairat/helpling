export { default as img_helpling } from './img/helpling.png'

export { default as img_apple } from './img/apple.png'
export { default as img_back } from './img/back.png'
export { default as img_close } from './img/close.png'
export { default as img_error } from './img/error.png'
export { default as img_google } from './img/google.png'
export { default as img_notification } from './img/notification.png'

import { ImageSourcePropType } from 'react-native'

import { default as img_nav_active_notifications } from './img/nav/active_notifications.png'
import { default as img_nav_active_offers } from './img/nav/active_offers.png'
import { default as img_nav_active_profile } from './img/nav/active_profile.png'
import { default as img_nav_active_requests } from './img/nav/active_requests.png'
import { default as img_nav_notifications } from './img/nav/notifications.png'
import { default as img_nav_offers } from './img/nav/offers.png'
import { default as img_nav_profile } from './img/nav/profile.png'
import { default as img_nav_requests } from './img/nav/requests.png'

export const nav: Record<string, ImageSourcePropType> = {
  Notifications: img_nav_notifications,
  Offers: img_nav_offers,
  Profile: img_nav_profile,
  Requests: img_nav_requests
}

export const navActive: Record<string, ImageSourcePropType> = {
  Notifications: img_nav_active_notifications,
  Offers: img_nav_active_offers,
  Profile: img_nav_active_profile,
  Requests: img_nav_active_requests
}
