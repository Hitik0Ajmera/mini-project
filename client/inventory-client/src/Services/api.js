import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api', // Use environment variable
  withCredentials: true, // Ensures cookies are sent with requests
});

// Add a request interceptor to include the JWT token from cookies
api.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert('Unauthorized! Please log in again.');
      // Optionally redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
