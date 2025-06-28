import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './main.css'

const container = document.createElement('div')
container.id = 'crxjs-app'
document.body.appendChild(container)

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
)