import { NavigationContainerRef } from '@react-navigation/native'
import { createRef } from 'react'

class Nav {
  ref = createRef<NavigationContainerRef>()

  async handleDeepLink(link?: string | null, initial?: boolean): Promise<void> {
    if (!link) {
      return
    }

    if (initial) {
      // TODO: fix hack
      await this.wait()
    }

    if (link.indexOf('helpling') === 0) {
      link = link.slice(11)
    } else if (link.indexOf('https://helpling.app') === 0) {
      link = link.slice(21)
    }

    const [route, param] = link.split('/')

    if (!['requests', 'offers', 'messages', 'profile'].includes(route)) {
      return
    }

    const navigator =
      route === 'requests'
        ? 'Requests'
        : route === 'offers'
        ? 'Offers'
        : route === 'messages'
        ? 'Messages'
        : route === 'profile'
        ? 'Profile'
        : null

    if (!navigator) {
      return
    }

    if (!param) {
      this.ref.current?.navigate(navigator)

      return
    }

    const screen =
      route === 'requests'
        ? 'Request'
        : route === 'offers'
        ? 'Offer'
        : route === 'messages'
        ? 'Thread'
        : null

    if (!screen) {
      return
    }

    this.ref.current?.navigate(navigator, {
      initial: false,
      params: {
        id: param
      },
      screen
    })
  }

  private wait() {
    return new Promise((resolve) => setTimeout(resolve, 100))
  }
}

export const nav = new Nav()
