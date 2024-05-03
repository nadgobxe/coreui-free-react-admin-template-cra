const https = require('https');
const fetch = require('node-fetch');

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
  console.log('Backend URL:', backendUrl);
  console.log('Agent:', agent);
  console.log('Context', context);

  // Remove the Netlify Function path from the URL
  const cleanedPath = path.replace('/.netlify/functions/serverProxy', '');
  const backendEndpoint = `${backendUrl}`;

  console.log('Making request to backend:', backendEndpoint);

  try {
    console.log('Try Making request to backend:', backendEndpoint);
    const response = await fetch(backendEndpoint, {
      method: httpMethod,
      headers: headers,
      body: JSON.stringify(body),
      agent: agent,
    });
  
    const responseText = await response.text();
    console.log('Backend response text:', responseText);
  
    // const responseData = JSON.parse(responseText);
  
    console.log('Backend response status:', response.status);
    console.log('Backend response data:', responseData);
  
    return {
      statusCode: response.status,
      headers: response.headers,
      // body: JSON.stringify(responseData),
    };
  } catch (error) {
    console.error('Error occurred while proxying the request:', error);

    return {
      statusCode: error.status || 500,
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
        'error.status': error.status,
        'error.message': error.message,
      }),
    };
  }
};