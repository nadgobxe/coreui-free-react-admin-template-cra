import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { useSelector } from 'react-redux'

// routes config
import { employeeRoutes } from '../routes'

const EmployeeAppContent = () => {
  const user = useSelector((state) => state.user || {})
  console.log('EmployeeAppContent')

  console.log(user.user)
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
          <Route
            path={`/employee-dashboard`}
            element={<Navigate to="/employee-dashboard" replace />}
          />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(EmployeeAppContent)
