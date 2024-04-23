import React, { useEffect, useState } from 'react'
import { fetchEmployees, fetchDeleteEmployee } from '../../api/fetch'
import { capitalize, formatDate } from '../../utils/helpers'
import { Link } from 'react-router-dom'

import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPopover,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTruck, cilTrash, cifRo, cilZoom, cilPeople } from '@coreui/icons'

// import WidgetsBrand from '../widgets/WidgetsBrand'
// import WidgetsDropdown from '../widgets/WidgetsDropdown'
// import MainChart from './MainChart'

const Dashboard = () => {
  const [employees, setEmployees] = useState([])
  const [backUpEmployees, setBackUpEmployees] = useState([])

  useEffect(() => {
    fetchEmployees().then((data) => {
      setEmployees(data.users)
      // Assuming you want to set `backUpEmployees` from localStorage
      const storedUsers = localStorage.getItem('user')
      setBackUpEmployees(storedUsers ? JSON.parse(storedUsers) : null)

      // After setting states, you should use another effect or a callback to see updated states.
    })
  }, []) // Correctly leave this dependency array empty for initial fetch only

  useEffect(() => {
    // This effect will log `backUpEmployees` whenever it changes, correctly reflecting the updated state.
    console.log(`backUpEmployees: ${backUpEmployees}`)
  }, [backUpEmployees]) // Depend on `backUpEmployees` to see changes
  const customPopoverStyle = {
    '--cui-popover-max-width': '200px',
    '--cui-popover-border-color': 'var(--cui-primary)',
    '--cui-popover-header-bg': 'var(--cui-primary)',
    '--cui-popover-header-color': 'var(--cui-white)',
    '--cui-popover-body-padding-x': '1rem',
    '--cui-popover-body-padding-y': '.5rem',
  }

  return (
    <>
      {/* <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-body-secondary">January - July 2023</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Year'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart />
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard> */}
      {/* <WidgetsBrand className="mb-4" withCharts /> */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Employees {' & '} Timesheets</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  {/* <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Recurring Clients
                        </div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow> */}
                  <hr className="mt-0" />
                  {/* {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-body-secondary small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))} */}
                </CCol>
                {/* <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-body-secondary small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol> */}
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Employee</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Role
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Total Income this Month
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Status
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {employees &&
                    employees.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                          <CAvatar size="md" src={item.picture} status="success" />
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.name}</div>
                          <div className="small text-body-secondary text-nowrap">
                            <span>
                              <CIcon size="xl" icon={cifRo} title="Romania" />
                            </span>{' '}
                            | Registered: {formatDate(item.date)}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {' '}
                          <span>
                            <CIcon size="xl" icon={cilTruck} title="Driver" />
                          </span>{' '}
                          {capitalize(item.role)}
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex justify-content-between text-nowrap">
                            <div className="fw-semibold">£796.00</div>
                            <div className="ms-3">
                              <small className="text-body-secondary">50</small>
                            </div>
                          </div>
                          <CProgress thin color="primary" value={75} height={10} />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CPopover
                            content={
                              <CButton
                                color="danger"
                                className="text-white"
                                onClick={() => {
                                  fetchDeleteEmployee(item.id)
                                    .then(() => {
                                      setEmployees(
                                        employees.filter((employee) => employee.id !== item.id),
                                      )
                                      console.log('Employee deleted')
                                      // After deletion, fetch the updated list of employees or remove the item from the state
                                    })
                                    .catch((error) => {
                                      console.error('Error deleting employee:', error)
                                    })
                                }}
                              >
                                Delete
                              </CButton>
                            }
                            placement="right"
                            title="Confrim driver deletion"
                            style={customPopoverStyle}
                          >
                            <Link to="#" className="text-danger">
                              <CIcon size="xl" icon={cilTrash} />
                            </Link>
                          </CPopover>
                          <Link to={`/admin/employee-details/${item.id}`} className="text-primary">
                            <CIcon size="xl" icon={cilZoom} />
                          </Link>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="small text-body-secondary text-nowrap mx-auto">
                            Last login
                          </div>
                          <div className="fw-semibold text-nowrap">{item.date}</div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  {!employees &&
                    backUpEmployees.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                          <CAvatar size="md" src={item.picture} status="success" />
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.name}</div>
                          <div className="small text-body-secondary text-nowrap">
                            <span>
                              <CIcon size="xl" icon={cifRo} title="Romania" />
                            </span>{' '}
                            | Registered: {formatDate(item.date)}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {' '}
                          <span>
                            <CIcon size="xl" icon={cilTruck} title="Driver" />
                          </span>{' '}
                          {capitalize(item.role)}
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex justify-content-between text-nowrap">
                            <div className="fw-semibold">£796.00</div>
                            <div className="ms-3">
                              <small className="text-body-secondary">50</small>
                            </div>
                          </div>
                          <CProgress thin color="primary" value={75} height={10} />
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CPopover
                            content={
                              <CButton
                                color="danger"
                                className="text-white"
                                onClick={() => {
                                  fetchDeleteEmployee(item.id)
                                    .then(() => {
                                      setEmployees(
                                        employees.filter((employee) => employee.id !== item.id),
                                      )
                                      console.log('Employee deleted')
                                      // After deletion, fetch the updated list of employees or remove the item from the state
                                    })
                                    .catch((error) => {
                                      console.error('Error deleting employee:', error)
                                    })
                                }}
                              >
                                Delete
                              </CButton>
                            }
                            placement="right"
                            title="Confrim driver deletion"
                            style={customPopoverStyle}
                          >
                            <Link to="#" className="text-danger">
                              <CIcon size="xl" icon={cilTrash} />
                            </Link>
                          </CPopover>
                          <Link to={`/admin/employee-details/${item.id}`} className="text-primary">
                            <CIcon size="xl" icon={cilZoom} />
                          </Link>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="small text-body-secondary text-nowrap mx-auto">
                            Last login
                          </div>
                          <div className="fw-semibold text-nowrap">{item.date}</div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
