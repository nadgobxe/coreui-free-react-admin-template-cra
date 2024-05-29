import React from 'react'
import { Link } from 'react-router-dom'

import { CButton, CCard, CCardBody, CCardImage, CCardTitle, CCardText } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import { useSelector } from 'react-redux'

const EmployeeDashboard = () => {
  const user = useSelector((state) => state.user.user)
  console.log(user)
  return (
    <>
      <CCard style={{ width: '18rem' }}>
        <CCardImage orientation="top" src={user.user.picture} />
        <CCardBody>
          <CCardTitle>Welcome {user.name}!</CCardTitle>
          <CCardText>
            <CIcon icon={cilUser} size="xl" />
            <br />
          </CCardText>
          <CButton color="primary" size="lg">
            <Link className="text-white" to={`/employee/employee-details/${user.user._id}`}>
              View Timesheet
            </Link>
          </CButton>
        </CCardBody>
      </CCard>
    </>
  )
}

export default EmployeeDashboard
