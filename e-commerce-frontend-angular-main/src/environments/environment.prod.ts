export const environment = {
  production: true,
  withCredentials: true,
  baseUrl: "http://ec2-3-133-147-18.us-east-2.compute.amazonaws.com:7777",
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Origin': '*',
  }
};