import axios from 'axios';

const axiosInstance = axios.create({

  // baseURL: 'https://sai-hospital-backend.onrender.com',
  baseURL: 'http://localhost:2000', //, Change this to your API base URL

  withCredentials: true, // Include credentials in requests 
  //process.env.REACT_APP_BASE_URL ||
}); 

export default axiosInstance;