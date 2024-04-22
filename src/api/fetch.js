import axios from 'axios'

const fetchEmployees = async () => {
  try {
    const response = await axios.get('https://holdemserver4-pxttn88c.b4a.run/employees/users')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const fetchEmployee = async (id) => {
  try {
    const response = await axios.get(
      `https://holdemserver4-pxttn88c.b4a.run/employees/employee/${id}`,
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const fetchDeleteEmployee = async (id) => {
  try {
    const response = await axios.delete(
      `https://holdemserver4-pxttn88c.b4a.run/employees/delete/${id}`,
    )
    return response.data // Assuming the server sends back some data on successful deletion
  } catch (error) {
    console.error(error)
    throw error // This allows the caller of fetchDeleteEmployee to handle the rejection
  }
}

const fetchAddTimesheet = async (data) => {
  try {
    const response = await axios.post(
      'https://holdemserver4-pxttn88c.b4a.run/tsheet/timesheet',
      data,
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const fetchGetTimesheet = async (id) => {
  try {
    const response = await axios.get(
      `https://holdemserver4-pxttn88c.b4a.run/tsheet/timesheet/employee/${id}`,
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const fetchDeleteTimesheet = async (id) => {
  try {
    const response = await axios.delete(
      `https://holdemserver4-pxttn88c.b4a.run/tsheet/delete/${id}`,
    )
    return response.data // Assuming the server sends back some data on successful deletion
  } catch (error) {
    console.error(error)
    throw error // This allows the caller of fetchDeleteTimesheet to handle the rejection
  }
}

const fetchEditTimesheet = async (id, data) => {
  try {
    const response = await axios.put(
      `https://holdemserver4-pxttn88c.b4a.run/tsheet/timesheet/${id}`,
      data,
    )
    console.log(data)
    return response.data
  } catch (error) {
    console.error(`error: ${error}`)
  }
}

const fetchEmployeeUserLogin = async (data) => {
  try {
    const response = await axios.post(
      'https://holdemserver4-pxttn88c.b4a.run/employees/login',
      data,
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// Corrected export statement
export {
  fetchEmployees,
  fetchEmployee,
  fetchDeleteEmployee,
  fetchGetTimesheet,
  fetchDeleteTimesheet,
  fetchEditTimesheet,
  fetchAddTimesheet,
  fetchEmployeeUserLogin,
}
