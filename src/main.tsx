import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/pages/app.tsx'
import '@/styles/index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import ReloadPrompt from '@/components/reloadPrompt'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReloadPrompt />
    <App />
  </React.StrictMode>,
)
