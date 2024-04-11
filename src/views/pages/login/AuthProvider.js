import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types' // Import PropTypes

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = () => {
    // Implement login logic
    setIsLoggedIn(true)
  }

  const logout = () => {
    // Implement logout logic
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node, // Define the prop type for children
}

export const useAuth = () => useContext(AuthContext)
