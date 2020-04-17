import { NavigationContainerRef } from '@react-navigation/native'
import { createRef } from 'react'

class Nav {
  ref = createRef<NavigationContainerRef>()

  navigate(route: string, params?: object) {
    this.ref.current?.navigate(route, params)
  }

  navigateAway(route: string, screen: string, params?: object) {
    this.ref.current?.navigate(route)

    // TODO: fix hack
    setTimeout(() => this.ref.current?.navigate(screen, params))
  }
}

export const nav = new Nav()
