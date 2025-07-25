import { HOSTNAME, sendStatus, storage } from "./config"
import { createContextMenuOption, type InstalledDetails, onActionClick, onContextMenuClick, onInstalled } from "./lib"

async function initPrompt(onInstalledReason: InstalledDetails['reason']) {
  const data = await storage.get()

  if (onInstalledReason === 'install') {
    data.prompt = 'Congratulations on installing this extension! Please save the following information to use it.'
  } else {
    data.prompt = 'Your extension was recently updated. Please update the following information as needed.'
  }

  await storage.set(data)
}

function buildMessage(message: string, url: string) {
  return message.replace('<url>', url)
}

function buildEndpointUrl(channelId: string) {
  return `https://${HOSTNAME}/discord/messages/${channelId}`
}

async function sendRequest(channelId: string, message: string, key: string) {
  const response = await fetch(buildEndpointUrl(channelId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: key
    },
    body: JSON.stringify({
      message
    })
  })

  const result = await response.json() as unknown

  console.log(result, response.status)

  return response.ok
}

async function openPopupInTab() {
  await chrome.tabs.create({ url: 'src/popup/main.html' })
}

onActionClick(async () => {
  await openPopupInTab()
})

onInstalled(async (details) => {
  await initPrompt(details.reason)

  await openPopupInTab()

  createContextMenuOption({
    title: 'Send to friends on Discord?',
    contexts: ['image'],
    id: 'send-to'
  })
})

onContextMenuClick(async (info) => {
  if (info.menuItemId !== 'send-to') return

  const tabId = await sendStatus.tab({
    status: 'pending'
  })

  if (!info.srcUrl) {
    console.log(info)
    throw new Error(`URL not found for selected image, check log for error info.`)
  }

  const data = await storage.get()

  const message = buildMessage(data.message, info.srcUrl)

  const ok = await sendRequest(data.channelId, message, data.key)

  await sendStatus.tab({ status: ok ? "success" : "error" }, tabId)
})