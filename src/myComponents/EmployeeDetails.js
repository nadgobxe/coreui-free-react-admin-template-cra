import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import {
  fetchEmployee,
  fetchGetTimesheet,
  fetchDeleteTimesheet,
  fetchAddTimesheet,
} from '../api/fetch'
import { capitalize, formatDate, formatNumber, reduceAmount } from 'src/utils/helpers'
import { CTable, CContainer, CRow, CCol, CButton, CFormInput, CAlert } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilCheck } from '@coreui/icons'
import { fetchEditTimesheet, fetchSendTimesheet } from '../api/fetch'
import EmployeeWidgets from './EmployeeDetailsParts/EmployeeWidgets'

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null)
  const [timesheet, setTimesheet] = useState(null)

  const [reduce, setReduce] = useState(0) // Added state to store the reduced amount [1/2]
  const [reduceHours, setReduceHours] = useState(0) // Added state to store the reduced hours [1/2]

  const [isShown, setIsShown] = useState(false) // Added state to control when to show the reduced amount [2/2]
  const [editingRowId, setEditingRowId] = useState(null) // Now tracks the ID of the row being edited
  const [edit, setEdit] = useState(false) // Added state to control when to show the edit button [1/2
  const [formEdit, setFormEdit] = useState({
    dateWorked: '',
    colleague: '',
    job: '', //postcodes (when returing the value from router.get postcodes = entry.job)
    hoursWorked: '',
  }) // Added state to control when to show the edit form
  const [addTimesheet, setAddTimesheet] = useState(false) // Added state to control when to show the add timesheet form [2/2]
  const [showAlert, setShowAlert] = useState(true) // Added state to control when to show the alert [1/2]

  let { id } = useParams()

  const fetchTimesheetsAndUpdateState = useCallback(() => {
    fetchGetTimesheet(id).then((data) => {
      console.log(data)
      setTimesheet(data)
      const reducedTotalAmount = reduceAmount(data, 'totalAmount')
      const reducedHoursWorked = reduceAmount(data, 'hoursWorked')
      setReduce(reducedTotalAmount)
      setReduceHours(reducedHoursWorked)
      console.log(reducedHoursWorked) // Update to log immediately after setting
    })
  }, [id, setReduce, setReduceHours]) // Include setReduce and setReduceHours if they are not constant

  useEffect(() => {
    fetchEmployee(id).then((data) => {
      setEmployee(data)
      console.log(data)
    })

    fetchTimesheetsAndUpdateState()

    const timer = setTimeout(() => setIsShown(true), 2000)

    return () => clearTimeout(timer)
  }, [id, edit, fetchTimesheetsAndUpdateState])

  const handleSendTimesheet = async () => {
    fetchSendTimesheet(id)
    alert('Timesheet sent')
  }

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

  const handleAddTimesheet = async () => {
    console.log(employee._name)
    const data = {
      employee: employee._id,
      employeeName: employee._name,
      dateWorked: formEdit.dateWorked,
      colleague: formEdit.colleague,
      job: formEdit.job,
      hoursWorked: formEdit.hoursWorked,
    }
    console.log(data)
    await fetchAddTimesheet(data)
    fetchTimesheetsAndUpdateState()
    setShowAlert(false) // Make sure the alert is shown
    handleAlert() // Start the timeout to hide it
  }

  const handleAlert = () => {
    setTimeout(() => {
      setShowAlert(true) // Directly set it to false after 3 seconds
    }, 3000)
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
    edit: (
      <>
        {editingRowId !== item.tsheetId ? (
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
        )}
        <CButton
          onClick={async () => {
            await fetchDeleteTimesheet(item.tsheetId)
            setEdit(!edit)
          }}
        >
          {' '}
          <CIcon icon={cilTrash} />{' '}
        </CButton>
      </>
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
        </CRow>
      </CContainer>
      {/* Render your employee details based on the id */}
      <CContainer>
        <CRow>
          <CCol md={9}>
            <CTable columns={columns} items={items} />
            <CContainer>
              <CRow>
                <CCol md={12}>
                  {!showAlert ? <CAlert color="success">Job added</CAlert> : <></>}
                  {!addTimesheet ? (
                    <div className="d-grid gap-2 col-4 mx-auto">
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="rounded-pill"
                        size="lg"
                        onClick={() => {
                          setAddTimesheet(!addTimesheet)
                        }}
                      >
                        <CIcon icon={cilPlus} />
                        <span className="ms-2">Add Timesheet</span>
                      </CButton>
                    </div>
                  ) : (
                    <div className="d-grid gap-2 col-12 mx-auto">
                      <div className="d-flex flex-row gap-0 column-gap-3">
                        <CFormInput
                          type="date"
                          size="sm"
                          name="dateWorked"
                          placeholder="Select Date"
                          aria-label="select date worked"
                          onChange={handleChange}
                        />

                        <CFormInput
                          type="text"
                          size="sm"
                          name="colleague"
                          placeholder="Add Colleagues"
                          aria-label="add colleagues to timesheet"
                          onChange={handleChange}
                        />

                        <CFormInput
                          type="text"
                          size="sm"
                          name="job"
                          placeholder="Postcodes"
                          aria-label="add postcodes to timesheet"
                          onChange={handleChange}
                        />
                        <CFormInput
                          type="text"
                          size="sm"
                          name="hoursWorked"
                          placeholder="Worked Hours"
                          aria-label="add hours worked to timesheet"
                          onChange={handleChange}
                        />
                      </div>

                      <CButton
                        color="primary"
                        variant="outline"
                        shape="rounded-pill"
                        size="lg"
                        onClick={async () => {
                          await handleAddTimesheet()
                          setAddTimesheet(!addTimesheet)
                        }}
                      >
                        <CIcon icon={cilCheck} />
                        <span className="ms-2">Save</span>
                      </CButton>
                    </div>
                  )}
                </CCol>
              </CRow>
            </CContainer>
          </CCol>
          <CCol md={3}>
            <EmployeeWidgets
              employee={employee}
              reduce={reduce}
              isShown={isShown}
              reduceHours={reduceHours}
              timesheet={timesheet}
              handleSendTimesheet={handleSendTimesheet}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default EmployeeDetails
