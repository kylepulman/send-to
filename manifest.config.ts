import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    48: 'public/logo.png',
  },
  action: {
    default_icon: {
      48: 'public/logo.png',
    },
    // default_popup: 'src/popup/main.html',
  },
  content_scripts: [{
    js: ['src/content/main.tsx'],
    matches: ['https://*/*'],
  }],
  background: {
    service_worker: 'src/background.ts'
  },
  permissions: [
    "storage",
    "contextMenus",
    "tabs",
    "activeTab"
  ]
})
