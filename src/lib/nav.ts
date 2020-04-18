import { NavigationContainerRef } from '@react-navigation/native'
import { createRef } from 'react'

export const navRef = createRef<NavigationContainerRef>()

class Nav {
  async handleDeepLink(link: string | null | undefined): Promise<void> {
    if (!link) {
      return
    }

    // TODO: fix hack
    await this.wait()

    if (link.indexOf('helpling') === 0) {
      link = link.slice(11)
    } else if (link.indexOf('https://helpling.app') === 0) {
      link = link.slice(21)
    }

    const [route, param] = link.split('/')

    if (route === 'requests') {
      if (param) {
        this.navigateAway('Requests', 'Request', {
          id: param
        })
      } else {
        this.navigate('Requests')
      }
    } else if (route === 'offers') {
      if (param) {
        this.navigateAway('Offers', 'Offer', {
          id: param
        })
      } else {
        this.navigate('Offers')
      }
    } else if (route === 'messages') {
      if (param) {
        this.navigateAway('Messages', 'Thread', {
          id: param
        })
      } else {
        this.navigate('Messages')
      }
    } else if (route === 'profile') {
      if (param === 'my_requests') {
        this.navigateAway('Profile', 'MyRequests', {
          helpling: false
        })
      } else if (param === 'my_accepted_requests') {
        this.navigateAway('Profile', 'MyRequests', {
          helpling: true
        })
      } else if (param === 'my_offers') {
        this.navigateAway('Profile', 'MyOffers', {
          helpling: false
        })
      } else if (param === 'my_accepted_offers') {
        this.navigateAway('Profile', 'MyOffers', {
          helpling: true
        })
      } else {
        this.navigate('Profile')
      }
    }
  }

  navigate(route: string, params?: object): void {
    navRef.current?.navigate(route, params)
  }

  navigateAway(route: string, screen: string, params?: object): void {
    navRef.current?.navigate(route)

    // TODO: fix hack
    setTimeout(() => navRef.current?.navigate(screen, params))
  }

  private wait() {
    return new Promise((resolve) => setTimeout(resolve, 100))
  }
}

export const nav = new Nav()
