import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import TalentProfileSetup from './pages/TalentProfileSetUp'
import Dashboard from './pages/Dashboard'
import EditProfilePage from './pages/EditProfilePage'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Routes>
      {/* Public landing page at “/” */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth flows */}
      <Route path="/login" element={<Login />} />
      <Route path="/setup-profile" element={<TalentProfileSetup />} />

      {/* Protected dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Protected edit-profile */}
      <Route
        path="/edit-profile-page"
        element={
          <PrivateRoute>
            <EditProfilePage />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default App