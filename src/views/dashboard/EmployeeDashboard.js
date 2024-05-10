import React from 'react'
import { Link } from 'react-router-dom'

import { CButton, CCard, CCardBody } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import { useSelector } from 'react-redux'

const EmployeeDashboard = () => {
  const user = useSelector((state) => state.user.user)

  return (
    <>
      <CCard style={{ width: '18rem' }}>
        <CCardImage orientation="top" src={ReactImg} />
        <CCardBody>
          <CCardTitle>Card title</CCardTitle>
          <CCardText>
            <CIcon icon={cilUser} size="xl" />
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </CCardText>
          <CButton color="primary" size="lg">
            <Link to={`/employee/dashboard//employee-details/${user.user._id}`}>Go somewhere</Link>
          </CButton>
        </CCardBody>
      </CCard>
    </>
  )
}

export default EmployeeDashboard
