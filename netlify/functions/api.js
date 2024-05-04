const axios = require('axios')

exports.handler = async function (event, context) {
  const { path, httpMethod, body } = event
  console.log('Received path:', path)
  console.log('Received httpMethod:', httpMethod)
  console.log('Received body:', body)

  if (path === '/employees/users' && httpMethod === 'GET') {
    try {
      const response = await axios.get('https://holdemserver4-pxttn88c.b4a.run/employees/users')
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

  if (path.startsWith('/employees/employee/') && httpMethod === 'GET') {
    const id = path.split('/').pop()
    try {
      const response = await axios.get(
        `https://holdemserver4-pxttn88c.b4a.run/employees/employee/${id}`,
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

  if (path.startsWith('/employees/delete/') && httpMethod === 'DELETE') {
    const id = path.split('/').pop()
    try {
      const response = await axios.delete(
        `https://holdemserver4-pxttn88c.b4a.run/employees/delete/${id}`,
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

  if (path === '/tsheet/timesheet' && httpMethod === 'POST') {
    try {
      const data = JSON.parse(body)
      const response = await axios.post(
        'https://holdemserver4-pxttn88c.b4a.run/tsheet/timesheet',
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

  if (path.startsWith('/tsheet/timesheet/employee/') && httpMethod === 'GET') {
    const id = path.split('/').pop()
    try {
      const response = await axios.get(
        `https://holdemserver4-pxttn88c.b4a.run/tsheet/timesheet/employee/${id}`,
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

  if (path.startsWith('/tsheet/delete/') && httpMethod === 'DELETE') {
    const id = path.split('/').pop()
    try {
      const response = await axios.delete(
        `https://holdemserver4-pxttn88c.b4a.run/tsheet/delete/${id}`,
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

  if (path.startsWith('/tsheet/timesheet/') && httpMethod === 'PUT') {
    const id = path.split('/').pop()
    try {
      const data = JSON.parse(body)
      const response = await axios.put(
        `https://holdemserver4-pxttn88c.b4a.run/tsheet/timesheet/${id}`,
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

  if (path === '/employees/login' && httpMethod === 'POST') {
    try {
      const data = JSON.parse(body)
      const response = await axios.post(
        'https://holdemserver4-pxttn88c.b4a.run/employees/login',
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
