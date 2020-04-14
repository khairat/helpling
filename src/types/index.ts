import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export interface PickerItemType {
  label: string
  value: string
}

export interface NotificationType {
  body: string
  title: string
  type: 'error' | 'notification'
}

export interface UserType {
  id: string
  city: string
  country: string
  name: string
}

export interface RequestType {
  id: string
  city: string
  country: string
  description: string
  helpling?: UserType
  status: 'pending' | 'accepted' | 'completed'
  type: 'food' | 'invite' | 'money' | 'physical'
  user: UserType
  createdAt: FirebaseFirestoreTypes.Timestamp
  updatedAt: FirebaseFirestoreTypes.Timestamp
}

export interface CommentType {
  id: string
  body: string
  user: UserType
  createdAt: FirebaseFirestoreTypes.Timestamp
}
