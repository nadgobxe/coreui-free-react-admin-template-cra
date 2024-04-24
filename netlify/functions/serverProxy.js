const axios = require('axios')

exports.handler = async (event, context) => {
  const { path, httpMethod, headers, body } = event
  const backendUrl = 'https://holdemserver4-pxttn88c.b4a.run' // Replace with your backend server URL

  try {
    const response = await axios({
      method: httpMethod,
      url: `${backendUrl}${path}`,
      headers,
      data: body,
    })
    console.log('Received event:', event)
    console.log('Making request to backend:', `${backendUrl}${path}`)
    return {
      statusCode: response.status,
      headers: response.headers,
      body: JSON.stringify(response.data),
    }
  } catch (error) {
    console.error('Error occurred while proxying the request:', error)
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: 'An error occurred while proxying the request.' }),
    }
  }
}
