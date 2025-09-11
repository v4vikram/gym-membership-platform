// utils/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:8000/api',
  baseURL: 'https://gym-membership-platform.onrender.com/api',
  withCredentials: true,

});

export default instance;
