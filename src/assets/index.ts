import { ImageSourcePropType } from 'react-native'

import { default as img_nav_active_notifications } from './img/nav/active_notifications.png'
import { default as img_nav_active_offers } from './img/nav/active_offers.png'
import { default as img_nav_active_profile } from './img/nav/active_profile.png'
import { default as img_nav_active_requests } from './img/nav/active_requests.png'
import { default as img_nav_notifications } from './img/nav/notifications.png'
import { default as img_nav_offers } from './img/nav/offers.png'
import { default as img_nav_profile } from './img/nav/profile.png'
import { default as img_nav_requests } from './img/nav/requests.png'
import { default as img_profile_about } from './img/profile/about.png'
import { default as img_profile_help } from './img/profile/help.png'
import { default as img_profile_offers } from './img/profile/offers.png'
import { default as img_profile_privacy } from './img/profile/privacy.png'
import { default as img_profile_requests } from './img/profile/requests.png'
import { default as img_profile_sign_out } from './img/profile/sign_out.png'
import { default as img_type_food } from './img/types/food.png'
import { default as img_type_invite } from './img/types/invite.png'
import { default as img_type_money } from './img/types/money.png'
import { default as img_type_physical } from './img/types/physical.png'

export const img_nav: Record<string, ImageSourcePropType> = {
  Notifications: img_nav_notifications,
  Offers: img_nav_offers,
  Profile: img_nav_profile,
  Requests: img_nav_requests
}

export const img_nav_active: Record<string, ImageSourcePropType> = {
  Notifications: img_nav_active_notifications,
  Offers: img_nav_active_offers,
  Profile: img_nav_active_profile,
  Requests: img_nav_active_requests
}

export const img_types: Record<string, ImageSourcePropType> = {
  food: img_type_food,
  invite: img_type_invite,
  money: img_type_money,
  physical: img_type_physical
}

export const img_profile: Record<string, ImageSourcePropType> = {
  about: img_profile_about,
  help: img_profile_help,
  offers: img_profile_offers,
  privacy: img_profile_privacy,
  requests: img_profile_requests,
  signOut: img_profile_sign_out
}

export { default as img_helpling } from './img/helpling.png'

export { default as img_auth_apple } from './img/auth/apple.png'
export { default as img_auth_google } from './img/auth/google.png'

export { default as img_hero_error } from './img/hero/error.png'

export { default as img_ui_add } from './img/ui/add.png'
export { default as img_ui_back } from './img/ui/back.png'
export { default as img_ui_close } from './img/ui/close.png'
export { default as img_ui_edit } from './img/ui/edit.png'
export { default as img_ui_error } from './img/ui/error.png'
export { default as img_ui_expand } from './img/ui/expand.png'
export { default as img_ui_link } from './img/ui/link.png'
export { default as img_ui_notification } from './img/ui/notification.png'
export { default as img_ui_remove } from './img/ui/remove.png'
export { default as img_ui_save } from './img/ui/save.png'
export { default as img_ui_search } from './img/ui/search.png'
export { default as img_ui_send } from './img/ui/send.png'
