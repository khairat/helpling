import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

// components

export type PickerItemType = {
  label: string
  value: string
}

export type NotificationType = {
  body: string
  title: string
  type: 'error' | 'notification'
}

// models

export type UserType = {
  id: string
  city: string
  country: string
  name: string
}

export type RequestType = {
  id: string
  city: string
  country: string
  description: string
  helpling?: UserType
  status: RequestStatusType
  type: RequestTypeType
  user: UserType
  createdAt: FirebaseFirestoreTypes.Timestamp
  updatedAt: FirebaseFirestoreTypes.Timestamp
}

export type RequestStatusType = 'pending' | 'accepted' | 'completed'

export type RequestTypeType = 'food' | 'invite' | 'money' | 'physical'

export type CommentType = {
  id: string
  body: string
  user: UserType
  createdAt: FirebaseFirestoreTypes.Timestamp
}

// input

export type RequestInputType = {
  city: string
  country: string
  description: string
  type: RequestTypeType
}
