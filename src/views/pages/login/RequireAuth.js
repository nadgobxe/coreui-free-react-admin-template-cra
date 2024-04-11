import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired, // Defining the prop type for children
}

export default RequireAuth
