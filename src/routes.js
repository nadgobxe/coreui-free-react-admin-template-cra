import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
//My Routes
const EmployeeDetails = React.lazy(() => import('./myComponents/EmployeeDetails'))
const EmployeeDashboard = React.lazy(() => import('./views/dashboard/EmployeeDashboard'))

const routes = [
  { path: '/', name: 'Home', element: Dashboard },
  { path: 'dashboard', name: 'Dashboard', element: Dashboard },
  { path: 'employee-details/:id', name: 'EmployeeDetails', element: EmployeeDetails },
]

const employeeRoutes = [
  { path: '/employee-details/:id', name: 'EmployeeDetails', element: EmployeeDetails },
  { path: '/dashboard', name: 'EmployeeDashboard', element: EmployeeDashboard },
]

export { routes, employeeRoutes }
