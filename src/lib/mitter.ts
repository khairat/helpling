import mitt, { Handler } from 'mitt'

import { DialogProps } from '../components/common/dialog'
import { NotificationType } from '../types'

class Mitter {
  mitter = mitt()

  error(message: string) {
    const options: NotificationType = {
      body: message,
      title: 'Error',
      type: 'error'
    }

    this.mitter.emit('error', options)
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

  signOut() {
    this.mitter.emit('signOut')
  }

  onSignOut(handler: Handler) {
    this.mitter.on('signOut', handler)
  }
}

export const mitter = new Mitter()
