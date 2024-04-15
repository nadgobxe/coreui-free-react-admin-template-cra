import React from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import PropTypes from 'prop-types' // Import PropTypes
import { useAuth } from './AuthProvider'

const RequireAuth = ({ children, allowedRoles }) => {
  const { isLoggedIn, user } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!allowedRoles.includes(user?.user.privilege)) {
    return <Navigate to={user?.user.privilege === 'admin' ? '/' : `/employee`} replace />
  }

  // if (
  //   user?.user.privilege === 'employee' &&
  //   location.pathname !== `/EmployeeDetails/${user.user._id}`
  // ) {
  //   return <Navigate to={`/EmployeeDetails/${user.user._id}`} replace />
  // }

  return children
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default RequireAuth
