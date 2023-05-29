import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ResetStyle from './ResetStyle.js'
import GlobalStyle from './GlobalStyle.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResetStyle/>
    <GlobalStyle />   
    <App />
  </React.StrictMode>,
)
