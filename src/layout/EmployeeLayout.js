import React from 'react'
import { AppSidebar, AppFooter, AppHeader, EmployeeAppContent } from '../components/index'
import EmployeeDashboard from 'src/views/dashboard/EmployeeDashboard'

const EmployeeLayout = () => {
  console.log('EmployeeLayout')
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <EmployeeAppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default EmployeeLayout
