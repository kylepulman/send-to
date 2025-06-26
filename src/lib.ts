export function openPopup() {
  return chrome.action.openPopup()
}

export function createContextMenuOption(title: string, contexts: (chrome.contextMenus.ContextType)[], id: string) {
  chrome.contextMenus.create({ title, contexts, id })
}

export function onInstalled(listener: (details: chrome.runtime.InstalledDetails) => Promise<void>) {
  chrome.runtime.onInstalled.addListener((details) => void listener(details))
}

export function onContextMenuClick(listener: (info: chrome.contextMenus.OnClickData) => Promise<void>) {
  chrome.contextMenus.onClicked.addListener((info) => void listener(info))
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