const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const response = await axios.get('https://holdemserver-1dfb99f436f4.herokuapp.com/');
    console.log('Backend response:', response.data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Request successful', response: response.data }),
    };
  } catch (error) {
    console.error('Error:', error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred' }),
    };
  }
};