import {
  Message,
  Storage,
  type InputEventHandler,
  type MouseEventHandler,
  type PropsWithChildren
} from './lib'

export const HOSTNAME = 'api.kylepulman.com'

export interface KyleErrorT extends Error {
  status: 200 | 400 | 401 | 500,
  external?: string | object
}

export interface NotificationParams {
  status: string,
  dismiss: MouseEventHandler<HTMLButtonElement>
}

export type Input = Record<'channelId' | 'message' | 'key', string>

export interface InputParams {
  name: string
  label: string
  type: 'text'
  placeholder: string
  onInput: InputEventHandler<HTMLInputElement>
}

export interface ButtonParams {
  canSave: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export type InfoBlockParams = PropsWithChildren<{
  link?: {
    href: string
    label: string
  }
  show: boolean
  dismiss: MouseEventHandler<HTMLButtonElement>
}>

export const storage = new Storage<{
  channelId: string
  message: string
  prompt: string
  showHint: boolean
  key: string
}>({
  channelId: '',
  message: 'Hello Discord friends! Check out this image: <url>',
  prompt: '',
  showHint: true,
  key: ''
})

export const sendStatus = new Message<{ status: 'idle' | 'pending' | 'success' | 'error' }>({
  status: 'idle'
})