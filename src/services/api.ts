import axios from 'axios';

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhaWdmc0BnbWFpbC5jb20iLCJzdWIiOiJiOGMwNjhmNy1hMTcyLTRhZTEtYTBiYi03MjZkNzRhMDNhNjMiLCJpYXQiOjE2OTQ1NjMyMTUsImV4cCI6MTcyNjA5OTIxNX0.3unvYhix65DMRqpLcpFpSjofkrVf68UWoEigC5UT8tk';

// Create an axios instance with the Authorization header configured
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

export default axiosInstance;