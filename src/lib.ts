// Chrome
export type InstalledDetails = chrome.runtime.InstalledDetails

export const openPopup = chrome.action.openPopup
export const createContextMenuOption = chrome.contextMenus.create

export function onInstalled(listener: (details: InstalledDetails) => Promise<void>) {
  chrome.runtime.onInstalled.addListener((details) => void listener(details))
}

export function onContextMenuClick(listener: (info: chrome.contextMenus.OnClickData) => Promise<void>) {
  chrome.contextMenus.onClicked.addListener((info) => void listener(info))
}

export function onActionClick(listener: (tab: chrome.tabs.Tab) => Promise<void>) {
  chrome.action.onClicked.addListener((tab) => void listener(tab))
}

export class Message<T> {
  constructor(public defaults: T) { }

  async tab(data: T, id?: chrome.tabs.Tab['id']) {
    if (!id) {
      const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })

      if (!tab.id) {
        throw new Error('Could not locate current tab.')
      }

      id = tab.id
    }

    await chrome.tabs.sendMessage(id, data)

    return id
  }

  async ext(data: T) {
    await chrome.runtime.sendMessage(data)
  }

  onMessage(listener: (
    message: T,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: unknown) => void
  ) => void) {
    chrome.runtime.onMessage.addListener(listener)
  }
}

export class Storage<T> {
  constructor(public defaults: T) { }

  async get(): Promise<T> {
    return await chrome.storage.local.get(this.defaults)
  }

  async set(input: Partial<T>) {
    await chrome.storage.local.set(input)
  }
}

// React
import {
  StrictMode,
  useEffect,
  useState,
  type InputEventHandler,
  type MouseEventHandler,
  type PropsWithChildren
} from 'react'

import { createRoot } from 'react-dom/client'

export {
  createRoot,
  StrictMode,
  useEffect,
  useState,
  type InputEventHandler,
  type MouseEventHandler,
  type PropsWithChildren
}

// Headless UI
import { Transition } from '@headlessui/react'

export { Transition }

// Heroicons
import {
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'


export {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon
}
