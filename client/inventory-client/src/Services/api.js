import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5272/api',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Dispatch a custom event to update auth state
      const event = new CustomEvent('auth-update', { detail: { isLoggedIn: false } });
      window.dispatchEvent(event);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;