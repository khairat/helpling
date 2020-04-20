import { TextStyle } from 'react-native'

import { layout } from './layout'

export const typography: Record<string, TextStyle> = {
  bold: {
    fontFamily: 'Inter-SemiBold'
  },
  footnote: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 12 * layout.lineHeight
  },
  medium: {
    fontFamily: 'Inter-Medium'
  },
  paragraph: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 16 * layout.lineHeight
  },
  regular: {
    fontFamily: 'Inter-Regular',
    fontSize: 16
  },
  small: {
    fontFamily: 'Inter-Regular',
    fontSize: 12
  },
  subtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 20
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24
  }
}
