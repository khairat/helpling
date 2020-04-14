import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

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

export interface Request {
  id: string
  city: string
  country: string
  description: string
  helpling?: User
  status: 'pending' | 'accepted' | 'completed'
  type: 'food' | 'invite' | 'money' | 'physical'
  user: User
  createdAt: FirebaseFirestoreTypes.Timestamp
  updatedAt: FirebaseFirestoreTypes.Timestamp
}
