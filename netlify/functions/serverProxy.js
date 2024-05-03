const https = require('https');
const axios = require('axios');

const agent = new https.Agent({
  rejectUnauthorized: false, // Set to true for production
});

exports.handler = async (event, context) => {
  const { path, httpMethod, headers, body } = event;
  const backendUrl = 'https://holdemserver-1dfb99f436f4.herokuapp.com/employees/login'; // Replace with your backend server URL

  console.log('Received event:', event);
  console.log('Path:', path);
  console.log('HTTP method:', httpMethod);
  console.log('Headers:', headers);
  console.log('Body:', JSON.stringify(body));
  console.log('Body - No Jsib:', body);

  const parsedBody = JSON.parse(body);
  console.log("Username:", parsedBody.username);
  console.log("Password:", parsedBody.password);

  console.log('Backend URL:', backendUrl);
  console.log('Agent:', agent);
  console.log('Context', context);

  // Remove the Netlify Function path from the URL
  const cleanedPath = path.replace('/.netlify/functions/serverProxy', '');
  const backendEndpoint = `${backendUrl}`;

  console.log('Making request to backend:', backendEndpoint);

  try {
    console.log('Try Making request to backend:', backendEndpoint);

    const response = await axios.post(backendEndpoint, {
      username: parsedBody.username,
      password: parsedBody.password,
    }, {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      httpsAgent: agent,
    });
    
    console.log('Backend response status:', response.status);
    console.log('Backend response data:', response.data);

    return {
      statusCode: response.status,
      headers: response.headers,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error occurred while proxying the request:', error);

    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({
        error: 'An error occurred while proxying the request.',
        prefix: 'serverProxy',
        message: error.message || 'Internal server error',
        path: path,
        httpMethod: httpMethod,
        headers: headers,
        body: body,
        context: context,
        backendUrl: backendUrl,
        backendEndpoint: backendEndpoint,
        'error.status': error.response?.status,
        'error.message': error.message,
      }),
    };
  }
};