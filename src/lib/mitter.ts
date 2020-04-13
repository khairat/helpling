import mitt, { Handler } from 'mitt'

import { DialogProps } from '../components/common/dialog'
import { NotificationType } from '../types'

class Mitter {
  mitter = mitt()

  error(notification: NotificationType) {
    this.mitter.emit('error', notification)
  }

  onError(handler: Handler) {
    this.mitter.on('error', handler)
  }

  dialog(options: DialogProps) {
    this.mitter.emit('dialog', options)
  }

  onDialog(handler: Handler) {
    this.mitter.on('dialog', handler)
  }

  loading(loading: boolean) {
    this.mitter.emit('loading', loading)
  }

  onLoading(handler: Handler) {
    this.mitter.on('loading', handler)
  }
}

export const mitter = new Mitter()
