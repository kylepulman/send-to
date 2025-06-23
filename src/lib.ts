export interface Storage {
  prompt: string
  channelId: string
  message: string
  showHint: boolean
}

export async function getStorage(_: Storage): Promise<Storage> {
  return await chrome.storage.local.get(_)
}

export async function setStorage(_: Partial<Storage>) {
  await chrome.storage.local.set(_)
}