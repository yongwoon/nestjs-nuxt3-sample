// utils/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Detailed error logging
api.interceptors.request.use(
  (config) => {
    // console.log('API Request Config:', {
    //   method: config.method?.toUpperCase(),
    //   url: config.url,
    //   baseURL: config.baseURL,
    //   headers: config.headers,
    //   data: config.data,
    // });
    return config;
  },
  (error) => {
    // console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    // console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
