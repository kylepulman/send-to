import { StrictMode, createRoot } from '@/lib'
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
