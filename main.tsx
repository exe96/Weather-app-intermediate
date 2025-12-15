import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style/default-config.css'
import './assets/style/reset.css'
import './assets/style/global-config.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
