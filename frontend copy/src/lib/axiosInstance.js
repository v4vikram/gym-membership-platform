import axios from 'axios';
export default axios.create({
  baseURL: 'http://localhost:8000/api',
  // baseURL: process.env.NEXT_PUBLIC_SITE_URL,
  withCredentials: true,
});


