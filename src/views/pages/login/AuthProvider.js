import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = useSelector((state) => state.user.user)

  const login = () => {
    setIsLoggedIn(true)
    localStorage.setItem('isLoggedIn', '1')
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export const useAuth = () => useContext(AuthContext)
