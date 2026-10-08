import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Menu, X, User, LogOut, Settings, Heart, Users, Building2 } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setShowUserMenu(false)
  }

  const getUserIcon = () => {
    if (!user) return <User className="w-5 h-5" />
    
    switch (user.userType) {
      case 'ngo':
        return <Building2 className="w-5 h-5" />
      case 'donor':
        return <Heart className="w-5 h-5" />
      case 'volunteer':
        return <Users className="w-5 h-5" />
      default:
        return <User className="w-5 h-5" />
    }
  }

  const getUserTypeLabel = () => {
    if (!user) return 'User'
    
    switch (user.userType) {
      case 'ngo':
        return 'NGO'
      case 'donor':
        return 'Donor'
      case 'volunteer':
        return 'Volunteer'
      default:
        return 'User'
    }
  }

  return (
    <nav className="relative bg-glass-white backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="group flex items-center space-x-3">
              <div className="relative w-10 h-10 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent group-hover:text-glow transition-all duration-300">
                SocialImpact
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className="text-white/80 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-glass-primary">
              Home
            </Link>
            <Link to="/campaigns" className="text-white/80 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-glass-primary">
              Campaigns
            </Link>
            <Link to="/about" className="text-white/80 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-glass-primary">
              About
            </Link>
            <Link to="/contact" className="text-white/80 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-glass-primary">
              Contact
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 text-white/80 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-glass-primary"
                >
                  {getUserIcon()}
                  <span>{user.name}</span>
                  <span className="text-xs bg-gradient-to-r from-neon-blue to-neon-purple text-white px-3 py-1 rounded-full">
                    {getUserTypeLabel()}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-glass-white backdrop-blur-md border border-white/20 rounded-2xl shadow-glow py-2 z-50">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-glass-primary transition-all duration-300"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-glass-primary transition-all duration-300"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-glass-primary transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white/80 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-glass-primary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-glass-primary transition-all duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-glass-white backdrop-blur-md border-t border-white/10">
              <Link
                to="/"
                className="text-white/80 hover:text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-glass-primary"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/campaigns"
                className="text-white/80 hover:text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-glass-primary"
                onClick={() => setIsOpen(false)}
              >
                Campaigns
              </Link>
              <Link
                to="/about"
                className="text-white/80 hover:text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-glass-primary"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white/80 hover:text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-glass-primary"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {user ? (
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center px-4 py-3">
                    {getUserIcon()}
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">{user.name}</div>
                      <div className="text-sm text-white/60">{getUserTypeLabel()}</div>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="text-white/80 hover:text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-glass-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="text-white/80 hover:text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-glass-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white/80 hover:text-white block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-glass-primary"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <Link
                    to="/login"
                    className="text-white/80 hover:text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-glass-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary block text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
