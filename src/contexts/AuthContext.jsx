import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password, userType) => {
    // Simulate API call
    const mockUser = {
      id: Date.now(),
      email,
      userType, // 'ngo', 'donor', 'volunteer'
      name: email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=0ea5e9&color=fff`,
      verified: true,
      createdAt: new Date().toISOString()
    }
    
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
    return { success: true, user: mockUser }
  }

  const register = async (userData) => {
    // Simulate API call
    const newUser = {
      id: Date.now(),
      ...userData,
      avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=0ea5e9&color=fff`,
      verified: false,
      createdAt: new Date().toISOString()
    }
    
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
    return { success: true, user: newUser }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
