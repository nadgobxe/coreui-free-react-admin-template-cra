import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import { employeeRoutes } from '../routes'

const EmployeeAppContent = () => {
  console.log('EmployeeAppContent')
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/employee" element={<Navigate to="employee/dashboard" replace />} />
          {employeeRoutes.map((route, idx) => {
            return (
              route.element && <Route key={idx} path={route.path} element={<route.element />} />
            )
          })}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(EmployeeAppContent)
