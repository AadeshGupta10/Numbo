import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App"
import { ThemeProvider } from './context/theme-context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='light'>
      <App />
    </ThemeProvider>
  </StrictMode>,
)