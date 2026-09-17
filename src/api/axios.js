import axios from 'axios';

const API_BASE_URL = 'https://auth-backend-fv8z.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    console.log('API REQUEST:', config.method?.toUpperCase(), config.baseURL + config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log('API RESPONSE:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API ERROR:', error.response?.data || error.message);

    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';

    return Promise.reject(new Error(message));
  }
);

export default api;