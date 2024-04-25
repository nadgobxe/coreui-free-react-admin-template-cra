const axios = require('axios')
const https = require('https')

const agent = new https.Agent({
  rejectUnauthorized: true, // Set to true for production
  secureProtocol: 'TLSv1_2_method' // Force TLS 1.2 as the protocol
});

exports.handler = async (event, context) => {
  const { path, httpMethod, headers, body } = event
  const backendUrl = 'https://holdemserver-1dfb99f436f4.herokuapp.com' // Replace with your backend server URL
  console.log('Received event:', event)
  console.log('Making request to backend:', `${backendUrl}${path}`)

  // Define the part of the URL to remove
  const partToRemove = '/.netlify/functions/serverProxy/'

  // Remove the specified part
  const cleanedUrl = path.replace(partToRemove, '/')

  try {
    const response = await axios({
      method: httpMethod,
      url: `${backendUrl}${cleanedUrl}`,
      headers,
      data: body,
      httpsAgent: agent, // Add the httpsAgent option
    })
    console.log('Received event:', event)
    console.log('Making request to backend:', `${backendUrl}${cleanedUrl}`)
    return {
      statusCode: response.status,
      headers: response.headers,
      body: JSON.stringify(response.data),
    }
  } catch (error) {
    console.error('Error occurred while proxying the request:', error)
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: 'An error occurred while proxying the request.2222' }),
    }
  }
}
