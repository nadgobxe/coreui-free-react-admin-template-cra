import React from 'react'
import { AppSidebar, AppFooter, EmployeeAppHeader, EmployeeAppContent } from '../components/index'

const EmployeeLayout = () => {
  console.log('EmployeeLayout')
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <EmployeeAppHeader />
        <div className="body flex-grow-1">
          <EmployeeAppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default EmployeeLayout
