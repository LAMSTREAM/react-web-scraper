
import axios from 'axios';
import {config} from "@@/meta-config"

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: config["api-url"], // Set the base URL, can use an environment variable
  timeout: 10000, // Request timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      console.error('Error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
