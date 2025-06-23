import { getStorage, setStorage } from "./lib"

function whenInstalled(listener: (details: chrome.runtime.InstalledDetails) => Promise<void>) {
  chrome.runtime.onInstalled.addListener((details) => {
    void listener(details)
  })
}

whenInstalled(async (details) => {
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
})