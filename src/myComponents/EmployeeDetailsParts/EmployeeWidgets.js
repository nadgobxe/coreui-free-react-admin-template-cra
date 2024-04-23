import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  CWidgetStatsA,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowTop, cilClock } from '@coreui/icons'
import { formatNumber } from '../../utils/helpers'

export default function EmployeeWidgets({ reduce, employee, isShown, reduceHours, timesheet }) {
  const [employeeProp, setEmployee] = useState([])
  const [loading, setLoading] = useState(true)
  const [payPerHour, setPayPerHour] = useState(0)
  const [totalPay, setTotalPay] = useState(0)
  const [payDividedByTotalHours, setPayDividedByTotalHours] = useState(0)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await employee
        const responsePay = await reduceHours
        const responseTotalPay = await reduce

        console.log(`response: `, response) // Use console.log to log objects directly
        setTotalPay(responseTotalPay)
        setPayPerHour(responsePay)
        setEmployee(response) // Update state with the resolved value
        setLoading(false) // Set loading to false after the operation is complete
        if (reduceHours === 0) {
          console.error('reduceHours is zero, division by zero is not allowed.')
          setPayDividedByTotalHours(0) // or return a default value or handle this case as needed
        } else {
          const calculatedValue = reduce / reduceHours
          setPayDividedByTotalHours(calculatedValue)
        }
        console.log(
          `reduce: ${totalPay} reduceHours ${payPerHour} KISFMMMMMM ${payDividedByTotalHours}`,
        )
      } catch (error) {
        console.error(error)
        setLoading(false) // Ensure loading is set to false even if there's an error
      }
    }

    fetchEmployee()
    // Log the `employee` prop to see its value
  }, [employee, reduce, reduceHours, timesheet, payDividedByTotalHours, payPerHour, totalPay]) // Depend on `employee` if it's a prop that could change

  console.log(employeeProp)
  console.log(`isShown: ${isShown} reduce: ${reduce}  employee: ${employee}`)
  return (
    <>
      <CCard style={{ width: '18rem' }}>
        <CCardImage rounded thumbnail src={employeeProp?.picture} />
        <CCardBody>
          <CCardTitle>{loading ? <p>loading...</p> : `${employeeProp?.name} Wages`}</CCardTitle>
          <CCardText></CCardText>
          <CButton color="primary" href="#">
            Send Time Sheet
          </CButton>
        </CCardBody>
      </CCard>

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
              ? `${employeeProp?.name}'s Total Earnings for month ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`
              : 'Loading...'}
          </>
        }
      />
      <CWidgetStatsA
        className="mb-4"
        color="primary"
        value={
          <>
            {
              isShown
                ? `Average Win per Hour £${formatNumber(payDividedByTotalHours)} ` // Show the reduced value when isShown is true
                : 'Loading...' // Show "Loading..." initially or while isShown is false
            }
            <span className="fs-6 fw-normal">
              (40.9% <CIcon icon={cilArrowTop} />)
            </span>
          </>
        }
        title={
          <>
            {isShown ? (
              <>
                {`${employeeProp?.name}'s worked a total of ${payPerHour} `}
                <CIcon icon={cilClock} size="sm" />
                {` hours in the month of  ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`}
              </>
            ) : (
              'Loading...'
            )}
          </>
        }
      />
    </>
  )
}
EmployeeWidgets.propTypes = {
  reduce: PropTypes.number,
  isShown: PropTypes.bool,
  employee: PropTypes.shape({
    name: PropTypes.string,
  }),
  reduceHours: PropTypes.number,
  timesheet: PropTypes.array,
}
