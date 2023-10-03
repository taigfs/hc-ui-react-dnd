import axios from 'axios';

// Create an axios instance with the Authorization header configured
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

export default axiosInstance;