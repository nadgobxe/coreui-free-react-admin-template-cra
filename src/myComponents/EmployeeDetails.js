import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import {
  fetchEmployee,
  fetchGetTimesheet,
  fetchDeleteTimesheet,
  fetchAddTimesheet,
  fetchEditTimesheet,
  fetchSendTimesheet,
} from '../api/fetch'
import { capitalize, formatDate, formatNumber, reduceAmount } from 'src/utils/helpers'
import { CTable, CContainer, CRow, CCol, CButton, CFormInput, CAlert } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilCheck } from '@coreui/icons'
import EmployeeWidgets from './EmployeeDetailsParts/EmployeeWidgets'

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null)
  const [timesheet, setTimesheet] = useState(null)
  const [reduce, setReduce] = useState(0)
  const [reduceHours, setReduceHours] = useState(0)
  const [isShown, setIsShown] = useState(false)
  const [editingRowId, setEditingRowId] = useState(null)
  const [edit, setEdit] = useState(false)
  const [formEdit, setFormEdit] = useState({
    dateWorked: '',
    colleague: '',
    job: '',
    hoursWorked: '',
  })
  const [addTimesheet, setAddTimesheet] = useState(false)
  const [showAlert, setShowAlert] = useState(true)

  let { id } = useParams()

  const fetchTimesheetsAndUpdateState = useCallback(() => {
    fetchGetTimesheet(id).then((data) => {
      console.log(data)
      setTimesheet(data)
      const reducedTotalAmount = reduceAmount(data, 'totalAmount')
      const reducedHoursWorked = reduceAmount(data, 'hoursWorked')
      setReduce(reducedTotalAmount)
      setReduceHours(reducedHoursWorked)
      console.log(reducedHoursWorked)
    })
  }, [id])

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
    try {
      await fetchSendTimesheet(id)
      alert('Timesheet sent')
    } catch (error) {
      console.error('Error sending timesheet:', error)
      alert('Failed to send timesheet')
    }
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
        })
      }
    }
    setEditingRowId(editingRowId === id ? null : id)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormEdit((formEdit) => ({ ...formEdit, [name]: value }))
  }

  const handleAddTimesheet = async () => {
    console.log(`Hey John: ${employee.name}`)
    const data = {
      employee: employee._id,
      employeeName: employee.name,
      dateWorked: formEdit.dateWorked,
      colleague: formEdit.colleague,
      job: formEdit.job,
      hoursWorked: formEdit.hoursWorked,
    }
    console.log(data)
    await fetchAddTimesheet(data)
    fetchTimesheetsAndUpdateState()
    setShowAlert(false)
    handleAlert()
  }

  const handleAlert = () => {
    setTimeout(() => {
      setShowAlert(true)
    }, 3000)
  }

  const columns = [
    { key: 'id', label: '#', _props: { scope: 'col' }, className: 'd-none d-md-table-cell' },
    { key: 'date', label: 'Date', _props: { scope: 'col' } },
    { key: 'colleagues', label: 'Colleagues', _props: { scope: 'col' } },
    { key: 'postcodes', label: 'Postcodes', _props: { scope: 'col' } },
    { key: 'hours_worked', label: 'Hours Worked', _props: { scope: 'col' } },
    { key: 'total_day_pay', label: 'Total Day Pay', _props: { scope: 'col' } },
    { key: 'edit', label: 'Edit', _props: { scope: 'col' } },
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
          <CIcon icon={cilTrash} />
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
            <p>
              Position: <strong>{capitalize(employee?.role)}</strong>
            </p>
          </CCol>
        </CRow>
      </CContainer>
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
                        onClick={() => setAddTimesheet(!addTimesheet)}
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
              handleSendTimeSheet={handleSendTimesheet}
            />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default EmployeeDetails
