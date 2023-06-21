import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataLayer } from './components/DataLayer.jsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataLayer>
      <App />
    </DataLayer>
    <Toaster/>
  </React.StrictMode>,
)
