import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './hooks/useAuth'
import { SearchProvider } from './hooks/searchContext'

const CLIENT_ID = "538664650648-rmfraegli8gel23fa1mj4a9o092l9s69.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <SearchProvider>
          <App />
        </SearchProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  </StrictMode>,
)
