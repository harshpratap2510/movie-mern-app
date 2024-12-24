// src/axiosConfig.js
import axios from 'axios';
const BASE_URL=import.meta.env.VITE_BASE_URL
axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${BASE_URL}/api/v1/user`;

export default axios;
