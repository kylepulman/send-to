import { getStorage, setStorage } from "./lib"

const HOSTNAME = 'api.kylepulman.com'
// const HOSTNAME = 'localhost'

function onInstalled(listener: (details: chrome.runtime.InstalledDetails) => Promise<void>) {
  chrome.runtime.onInstalled.addListener((details) => void listener(details))
}

function onContextMenuClick(listener: (info: chrome.contextMenus.OnClickData) => Promise<void>) {
  chrome.contextMenus.onClicked.addListener((info) => void listener(info))
}

onInstalled(async (details) => {
  const _ = await getStorage({
    channelId: '',
    message: 'Hello Discord friends! Check out this image: <url>',
    prompt: '',
    showHint: true
  })

  if (details.reason === 'install') {
    _.prompt = 'Congratulations on installing this extension! Please complete the following to use it.'
  } else {
    _.prompt = 'Your extension was recently updated. Please update the following as needed.'
  }

  await setStorage(_)

  await chrome.action.openPopup()

  chrome.contextMenus.create({
    title: 'Send to friends on Discord?',
    contexts: ['image'],
    id: 'send-to'
  })
})

onContextMenuClick(async (info) => {
  if (info.menuItemId === 'send-to') {
    const data = await getStorage({
      channelId: 'undefined',
      message: 'Hello Discord friends! Check out this image: <url>'
    })

    const url = info.srcUrl

    if (!url) {
      console.log(info)
      throw new Error(`URL not found for selected image, check log for error info.`)
    }

    const message = data.message.replace('<url>', url)

    const response = await fetch(`http://${HOSTNAME}:3000/discord/messages/${data.channelId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message
      })
    })

    console.log(response.ok, response.url)
  }
})