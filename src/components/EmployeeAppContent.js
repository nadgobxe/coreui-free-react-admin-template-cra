import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { useSelector } from 'react-redux'
import EmployeeDashboard from '../views/dashboard/EmployeeDashboard'

// routes config
import { employeeRoutes } from '../routes'

const EmployeeAppContent = () => {
  const user = useSelector((state) => state.user || {})
  console.log('EmployeeAppContent')
  const location = useLocation()
  useEffect(() => {
    console.log('Current path:', location.pathname)
  }, [location])

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {employeeRoutes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(EmployeeAppContent)
