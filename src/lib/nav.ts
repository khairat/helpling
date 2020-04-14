import { NavigationContainerRef } from '@react-navigation/native'
import { createRef } from 'react'

class Nav {
  ref = createRef<NavigationContainerRef>()
}

export const nav = new Nav()
