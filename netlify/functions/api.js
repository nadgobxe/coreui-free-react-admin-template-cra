const axios = require('axios')

exports.handler = async function (event, context) {
  const { path, httpMethod, body } = event
  const cleanedPath = path.replace('/.netlify/functions/api', '')

  if (cleanedPath === '/employees/users' && httpMethod === 'GET') {
    try {
      const response = await axios.get(
        'https://holdemserver-1dfb99f436f4.herokuapp.com/employees/users',
      )
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      }
    } catch (error) {
      console.error(
        'Error fetching employees:',
        error.response
          ? {
              status: error.response.status,
              headers: error.response.headers,
              data: error.response.data,
            }
          : error.message,
      )
      return {
        statusCode: error.response ? error.response.status : 500,
        body: JSON.stringify({ error: 'Failed to fetch data' }),
      }
    }
  }

  if (cleanedPath.startsWith('/employees/employee/') && httpMethod === 'GET') {
    const id = cleanedPath.split('/').pop()
    try {
      const response = await axios.get(
        `https://holdemserver-1dfb99f436f4.herokuapp.com/employees/employee/${id}`,
      )
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      }
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      }
    }
  }

  if (cleanedPath.startsWith('/employees/delete/') && httpMethod === 'DELETE') {
    const id = cleanedPath.split('/').pop()
    try {
      const response = await axios.delete(
        `https://holdemserver-1dfb99f436f4.herokuapp.com/employees/delete/${id}`,
      )
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      }
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      }
    }
  }

  if (cleanedPath === '/tsheet/timesheet' && httpMethod === 'POST') {
    try {
      const data = JSON.parse(body)
      const response = await axios.post(
        'https://holdemserver-1dfb99f436f4.herokuapp.com/tsheet/timesheet',
        data,
      )
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      }
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      }
    }
  }

  if (cleanedPath.startsWith('/tsheet/timesheet/employee/') && httpMethod === 'GET') {
    const id = cleanedPath.split('/').pop()
    try {
      const response = await axios.get(
        `https://holdemserver-1dfb99f436f4.herokuapp.com/tsheet/timesheet/employee/${id}`,
      )
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      }
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      }
    }
  }

  if (cleanedPath.startsWith('/tsheet/tsheet/email/') && httpMethod === 'GET') {
    const id = cleanedPath.split('/').pop()
    console.log("test email send")
    try {
      const response = await axios.get(
        `https://holdemserver-1dfb99f436f4.herokuapp.com/tsheet/email/${id}`,
      )
      return {
        console.log("test email send success")
        statusCode: 200,
        body: JSON.stringify(response.data),
      }
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      }
    }
  }

  if (cleanedPath.startsWith('/tsheet/delete/') && httpMethod === 'DELETE') {
    const id = cleanedPath.split('/').pop()
    try {
      const response = await axios.delete(
        `https://holdemserver-1dfb99f436f4.herokuapp.com/tsheet/delete/${id}`,
      )
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      }
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      }
    }
  }

  if (cleanedPath.startsWith('/tsheet/timesheet/') && httpMethod === 'PUT') {
    const id = cleanedPath.split('/').pop()
    try {
      const data = JSON.parse(body)
      const response = await axios.put(
        `https://holdemserver-1dfb99f436f4.herokuapp.com/tsheet/timesheet/${id}`,
        data,
      )
      console.log(data)
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      }
    } catch (error) {
      console.error(`error: ${error}`)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      }
    }
  }

  if (cleanedPath === '/employees/login' && httpMethod === 'POST') {
    try {
      const data = JSON.parse(body)
      const response = await axios.post(
        'https://holdemserver-1dfb99f436f4.herokuapp.com/employees/login',
        data,
      )
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      }
    } catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      }
    }
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'Not Found' }),
  }
}
