import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AudioProvider } from "./hooks/AudioContext.jsx"
import { App } from './App.jsx'
import { BrowserRouter } from 'react-router-dom'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AudioProvider>
        <App />
      </AudioProvider>
    </BrowserRouter>
  </StrictMode>,
)
