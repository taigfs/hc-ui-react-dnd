import axios from 'axios';

const BEARER_TOKEN = import.meta.env.VITE_TOKEN as string;

// Create an axios instance with the Authorization header configured
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

export default axiosInstance;