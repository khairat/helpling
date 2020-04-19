import Share from 'react-native-share'

import { KindType, RequestType } from '../types'

class Sharing {
  share(kind: KindType, item: RequestType): void {
    const {
      description,
      id,
      user: { name }
    } = item

    Share.open({
      message: `"${description}"\n\nView ${kind} by ${name} on Helpling`,
      url: `https://helpling.app/${kind}s/${id}`
    })
  }
}

export const sharing = new Sharing()
