import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types' // Import PropTypes
import { useAuth } from './AuthProvider'

const RequireAuth = ({ children, allowedRoles }) => {
  const { isLoggedIn, user } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!allowedRoles[0].includes(user?.user.privilege)) {
    console.log(allowedRoles[0])
    console.log(user?.user.privilege)
    console.log(allowedRoles.includes(user?.user.privilege))
    return <Navigate to="/unauthorized" replace />
  }

  if (allowedRoles[0].includes(user?.user.privilege)) {
    return children
  }

  return children
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default RequireAuth
