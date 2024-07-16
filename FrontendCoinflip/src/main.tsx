import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'


// here should be manifest file, example in the link below
const manifestUrl = "https://raw.githubusercontent.com/Incept10n/BUFF/master/tonconnect-manifest.json";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}> 
    <App />
  </TonConnectUIProvider>,
)
