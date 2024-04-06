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
  CButton,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowTop, cilOptions, cilPencil } from '@coreui/icons'
import { fetchEditTimesheet } from '../api/fetch'

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null)
  const [timesheet, setTimesheet] = useState(null)
  const [reduce, setReduce] = useState(0) // Added state to store the reduced amount [1/2
  const [isShown, setIsShown] = useState(false) // Added state to control when to show the reduced amount [2/2]
  const [editingRowId, setEditingRowId] = useState(null) // Now tracks the ID of the row being edited
  const [edit, setEdit] = useState(false) // Added state to control when to show the edit button [1/2
  const [formEdit, setFormEdit] = useState({
    dateWorked: '',
    colleague: '',
    job: '', //postcodes (when returing the value from router.get postcodes = entry.job)
    hoursWorked: '',
  }) // Added state to control when to show the edit form

  let { id } = useParams()

  const fetchTimesheetsAndUpdateState = () => {
    fetchGetTimesheet(id).then((data) => {
      console.log(data)
      setTimesheet(data)
      setReduce(reduceAmount(data)) // Assuming this needs to be updated too
    })
  }

  useEffect(() => {
    fetchEmployee(id).then((data) => {
      setEmployee(data)
      console.log(data)
    })

    fetchTimesheetsAndUpdateState()
    // fetchGetTimesheet(id).then((data) => {
    //   setTimesheet(data)
    //   setReduce(reduceAmount(data))
    //   console.log(data)
    // })

    const timer = setTimeout(() => setIsShown(true), 2000)

    return () => clearTimeout(timer)
  }, [id, edit]) // This effect will run every time the id changes

  const handleEdit = (id) => {
    console.log(`id: ${id}`)

    if (id === null) {
      console.log('id is null')
    } else {
      const currentTimesheet = timesheet.find((item) => item.tsheetId === id)
      if (currentTimesheet) {
        setFormEdit({
          dateWorked: currentTimesheet.dateWorked || '',
          colleague: currentTimesheet.colleagues || '',
          job: currentTimesheet.postcodes || '',
          hoursWorked: currentTimesheet.hoursWorked || '',
          hourlyPay: currentTimesheet.hourlyPay || '',
          overTime: currentTimesheet.overTime || '',
          totalAmount: currentTimesheet.totalAmount || '',
          // Add other fields as necessary
        })
      }
    }
    // If the clicked row's ID is the same as the currently editing row, stop editing (set to null).
    // Otherwise, set the clicked row's ID as the new editingRowId.
    setEditingRowId(editingRowId === id ? null : id)
  }

  const handleChange = (e) => {
    const { name, value } = e.target // Destructure the name and value from the event target
    setFormEdit((formEdit) => ({ ...formEdit, [name]: value }))
  }

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
    {
      key: 'edit',
      label: 'Edit',
      _props: { scope: 'col' },
    },
  ]

  const items = timesheet?.map((item, index) => ({
    id: index + 1,
    date:
      editingRowId !== item.tsheetId ? (
        item.dateWorked ? (
          formatDate(item.dateWorked)
        ) : (
          'No Date Provided'
        )
      ) : (
        <CFormInput
          type="date"
          size="sm"
          name="dateWorked"
          placeholder="Change date"
          aria-label="change date"
          onChange={handleChange}
        />
      ),
    colleagues:
      editingRowId !== item.tsheetId ? (
        item.colleagues ? (
          item.colleagues
        ) : (
          'None'
        )
      ) : (
        <CFormInput
          type="text"
          size="sm"
          name="colleague"
          placeholder="Change colleagues"
          aria-label="change colleagues"
          onChange={handleChange}
        />
      ),
    postcodes:
      editingRowId !== item.tsheetId ? (
        item.postcodes ? (
          item.postcodes
        ) : (
          'No Postcodes Provided'
        )
      ) : (
        <CFormInput
          type="text"
          size="sm"
          name="job"
          placeholder="Change postcodes"
          aria-label="change postcodes"
          onChange={handleChange}
        />
      ),
    hours_worked:
      editingRowId !== item.tsheetId ? (
        item.hoursWorked ? (
          item.hoursWorked
        ) : (
          'No Hours Provided'
        )
      ) : (
        <CFormInput
          type="text"
          size="sm"
          name="hoursWorked"
          placeholder="Change hours worked"
          aria-label="change hours worked"
          onChange={handleChange}
        />
      ),
    total_day_pay: item.totalAmount ? `£${formatNumber(item.totalAmount)}` : 'N/A',
    edit:
      editingRowId !== item.tsheetId ? (
        <CButton
          onClick={() => {
            handleEdit(item.tsheetId)
            console.log(timesheet)
          }}
        >
          <CIcon icon={cilPencil} />
        </CButton>
      ) : (
        <CButton
          onClick={async () => {
            await fetchEditTimesheet(item.tsheetId, formEdit)
            handleEdit(null)
            setEdit(!edit)
          }}
        >
          Save
        </CButton>
      ),
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
