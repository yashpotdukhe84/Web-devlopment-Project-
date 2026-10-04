import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, signInWithGoogle, signOutUser } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

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
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          avatar: firebaseUser.photoURL || `https://ui-avatars.com/api/?name=${firebaseUser.displayName}&background=0ea5e9&color=fff`,
          verified: true,
          userType: 'donor', // Default type
          createdAt: new Date().toISOString()
        }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
      } else {
        // User is signed out
        setUser(null)
        localStorage.removeItem('user')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email, password, userType) => {
    // For demo purposes, keep the mock login
    // In production, you would integrate with Firebase Auth email/password
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

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithGoogle()
      return result
    } catch (error) {
      console.error('Google sign-in error:', error)
      return { success: false, error: error.message }
    }
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

  const logout = async () => {
    try {
      const result = await signOutUser()
      if (result.success) {
        setUser(null)
        localStorage.removeItem('user')
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Fallback to local logout
      setUser(null)
      localStorage.removeItem('user')
    }
  }

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    login,
    loginWithGoogle,
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
