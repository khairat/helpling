export interface PickerItem {
  label: string
  value: string
}

export interface NotificationType {
  body: string
  title: string
  type: 'error' | 'notification'
}

export interface User {
  id: string
  city: string
  country: string
  name: string
}
