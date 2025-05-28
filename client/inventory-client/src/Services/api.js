import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8001/api', // Replace with your server's base URL
  withCredentials: true, // This ensures cookies are sent with requests
});

// Add a request interceptor to include the JWT token from cookies
api.interceptors.request.use(
  (config) => {
    // You can add additional headers here if needed
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors (e.g., unauthorized, token expired)
    if (error.response && error.response.status === 401) {
      alert('Unauthorized! Please log in again.');
      // Optionally redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;