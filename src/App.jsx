import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CampaignProvider } from './contexts/CampaignContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns'
import CampaignDetail from './pages/CampaignDetail'
import CreateCampaign from './pages/CreateCampaign'
import Profile from './pages/Profile'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <AuthProvider>
      <CampaignProvider>
        <Router>
          <div className="min-h-screen bg-secondary-50">
            <Navbar />
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/campaigns/:id" element={<CampaignDetail />} />
                <Route path="/create-campaign" element={<CreateCampaign />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CampaignProvider>
    </AuthProvider>
  )
}

export default App


