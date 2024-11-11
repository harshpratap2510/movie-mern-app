// src/axiosConfig.js
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000/api/v1/users';

export default axios;
