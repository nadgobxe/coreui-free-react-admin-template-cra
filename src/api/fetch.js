import React from 'react' // Note: React import seems unused in this snippet.
import axios from 'axios'

const fetchEmployees = async () => {
  try {
    const response = await axios.get('http://localhost:4005/employees/users')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const fetchEmployee = async (id) => {
  try {
    const response = await axios.get(`http://localhost:4005/employees/employee/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const fetchDeleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:4005/employees/delete/${id}`)
    return response.data // Assuming the server sends back some data on successful deletion
  } catch (error) {
    console.error(error)
    throw error // This allows the caller of fetchDeleteEmployee to handle the rejection
  }
}

const fetchGetTimesheet = async (id) => {
  try {
    const response = await axios.get(`http://localhost:4005/tsheet/timesheet/employee/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const fetchDeleteTimesheet = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:4005/tsheet/delete/${id}`)
    return response.data // Assuming the server sends back some data on successful deletion
  } catch (error) {
    console.error(error)
    throw error // This allows the caller of fetchDeleteTimesheet to handle the rejection
  }
}
// Corrected export statement
export {
  fetchEmployees,
  fetchEmployee,
  fetchDeleteEmployee,
  fetchGetTimesheet,
  fetchDeleteTimesheet,
}
