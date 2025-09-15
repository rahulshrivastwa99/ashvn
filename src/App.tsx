import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AuthGuard from './components/AuthGuard'
import Router from './components/Router'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthGuard>
          <Router />
        </AuthGuard>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App