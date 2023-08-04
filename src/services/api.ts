import axios from 'axios';

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhaWdmc0BnbWFpbC5jb20iLCJzdWIiOjQsImlhdCI6MTY5MDMxNTYyNiwiZXhwIjoxNzIxODUxNjI2fQ.Qn38NFzYkUyU-dfNJfy15Tio3wtMjScBMRQuDOwM5yg';

// Create an axios instance with the Authorization header configured
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

export default axiosInstance;