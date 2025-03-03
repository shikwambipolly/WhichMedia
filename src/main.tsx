import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import CSS files
import './styles/global.css'
import './styles/components/layout.css'
import './styles/components/search.css'
import './styles/components/ui.css'
import './styles/components/modal.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
