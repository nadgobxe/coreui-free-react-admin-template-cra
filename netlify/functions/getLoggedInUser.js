const axios = require('axios')

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    }
  }

  const { authorization } = event.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' }),
    }
  }

  const token = authorization.split(' ')[1]

  try {
    const userResponse = await axios.get(
      'https://holdemserver-1dfb99f436f4.herokuapp.com/employees/loggedin',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      },
    )

    return {
      statusCode: 200,
      body: JSON.stringify(userResponse.data),
    }
  } catch (error) {
    console.error('Error getting logged-in user:', error.response.data)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    }
  }
}