import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import VersePortal from './Energy/VersePortal.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import ProtectedAdminRoute from './components/routes/ProtectedAdminRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VersePortal />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
