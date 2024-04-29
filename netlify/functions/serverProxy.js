const axios = require('axios')
const https = require('https')

const agent = new https.Agent({
  rejectUnauthorized: false, // Set to true for production
})

exports.handler = async (event, context) => {
  const { path, httpMethod, headers, body } = event
  const backendUrl = 'https://holdemserver-1dfb99f436f4.herokuapp.com' // Replace with your backend server URL

  console.log('Received event:', event)
  console.log('Path:', path)
  console.log('HTTP method:', httpMethod)
  console.log('Headers:', headers)
  console.log('Body:', body)
  console.log('Backend URL:', backendUrl)
  console.log('Agent:', agent)
  console.log('Context', context)

  // Remove the Netlify Function path from the URL
  const cleanedPath = path.replace('/.netlify/functions/serverProxy', '')

  const backendEndpoint = `${backendUrl}${cleanedPath}`
  console.log('Making request to backend:', backendEndpoint)

  try {
    const response = await axios({
      method: httpMethod,
      url: backendEndpoint,
      headers,
      data: body,
    })

    console.log('Backend response status:', response.status)
    console.log('Backend response data:', response.data)

    return {
      statusCode: response.status,
      headers: response.headers,
      body: JSON.stringify(response.data),
    }
  } catch (error) {
    console.error('Error occurred while proxying the request:', error)
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({
        error: 'An error occurred while proxying the request.',
        prefix: 'serverProxy',
        "message": error.response?.data || 'Internal server error',
        "path": path,
       "httpMethod" : httpMethod,
        "headers": headers,
        "body" : body,
        "context": context,
        // "Agent": agent,
        "backendUrl": backendUrl,
        "backendEndpoint": backendEndpoint,
        "error.response.status": error.response?.status,
        "error.response.data": error.response?.data,
      }),
    }
  }
}
