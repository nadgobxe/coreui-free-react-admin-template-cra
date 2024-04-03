import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchEmployee, fetchGetTimesheet, fetchDeleteTimesheet } from '../api/fetch'
import { capitalize, formatDate, formatNumber, reduceAmount } from 'src/utils/helpers'
import {
  CTable,
  CContainer,
  CRow,
  CCol,
  CWidgetStatsA,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowTop, cilOptions } from '@coreui/icons'

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null)
  const [timesheet, setTimesheet] = useState(null)
  const [reduce, setReduce] = useState(0) // Added state to store the reduced amount [1/2
  const [isShown, setIsShown] = useState(false) // Added state to toggle the modal [2/2

  let { id } = useParams()

  useEffect(() => {
    fetchEmployee(id).then((data) => {
      setEmployee(data)
      console.log(data)
    })
    fetchGetTimesheet(id).then((data) => {
      setTimesheet(data)
      setReduce(reduceAmount(data))
      console.log(data)
    })

    const timer = setTimeout(() => setIsShown(true), 2000)

    return () => clearTimeout(timer)
  }, [id]) // This effect will run every time the id changes

  const columns = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'date',
      label: 'Date',
      _props: { scope: 'col' },
    },
    {
      key: 'colleagues',
      label: 'Colleagues',
      _props: { scope: 'col' },
    },
    {
      key: 'postcodes',
      label: 'Postcodes',
      _props: { scope: 'col' },
    },
    {
      key: 'hours_worked',
      label: 'Hours Worked',
      _props: { scope: 'col' },
    },
    {
      key: 'total_day_pay',
      label: 'Total Day Pay',
      _props: { scope: 'col' },
    },
  ]

  const items = timesheet?.map((item, index) => ({
    id: index + 1,
    date: item.dateWorked ? formatDate(item.dateWorked) : 'No Date Provided',
    colleagues: item.colleagues ? item.colleagues : 'None',
    postcodes: item.postcodes ? item.postcodes : 'No Postcodes Provided',
    hours_worked: item.hoursWorked ? item.hoursWorked : 'No Hours Provided',
    total_day_pay: item.totalAmount ? `£${formatNumber(item.totalAmount)}` : 'N/A',
  }))

  return (
    <div>
      <CContainer>
        <CRow>
          <CCol sm="auto">
            <p>Employee ID: {id}</p>
          </CCol>
          <CCol sm="auto">
            <p>Name: {employee?.name}</p>
          </CCol>
          <CCol sm="auto">
            {' '}
            <p>
              Position: <strong>{capitalize(employee?.role)}</strong>
            </p>
          </CCol>
          <CCol sm="auto">
            <img src={employee?.picture} alt={employee?.name} height={60} />
          </CCol>
        </CRow>
      </CContainer>
      {/* Render your employee details based on the id */}
      <CContainer>
        <CRow>
          <CCol md={9}>
            <CTable columns={columns} items={items} />
          </CCol>
          <CCol md={3}>
            <CWidgetStatsA
              className="mb-4"
              color="primary"
              value={
                <>
                  {
                    isShown
                      ? `£${reduce} ` // Show the reduced value when isShown is true
                      : 'Loading...' // Show "Loading..." initially or while isShown is false
                  }
                  <span className="fs-6 fw-normal">
                    (40.9% <CIcon icon={cilArrowTop} />)
                  </span>
                </>
              }
              title={
                <>
                  {isShown
                    ? `${employee.name}'s Total Earnings for month ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`
                    : 'Loading...'}
                </>
              }
              action={
                <CDropdown alignment="end">
                  <CDropdownToggle color="transparent" caret={false} className="p-0">
                    <CIcon icon={cilOptions} className="text-white" />
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>Action</CDropdownItem>
                    <CDropdownItem>Another action</CDropdownItem>
                    <CDropdownItem>Something else here...</CDropdownItem>
                    <CDropdownItem disabled>Disabled action</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              }
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default EmployeeDetails
