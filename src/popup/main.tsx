import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './main.css'

const rootRef = document.querySelector('#root')

if (!rootRef) {
  throw new Error('Reference to "root" element could not be found at popup.')
}

createRoot(rootRef).render(
  <StrictMode>
    <App />
  </StrictMode>
)
