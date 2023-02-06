export const environment = {
  production: true,
  withCredentials: true,
  baseUrl: "http://ec2-18-219-177-77.us-east-2.compute.amazonaws.com:7777",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
  }
};