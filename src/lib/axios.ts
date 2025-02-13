import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // This is important for cookies
});

// Request interceptor for API calls
axiosClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 419 (CSRF token mismatch)
    if (error.response?.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Get new CSRF token
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include'
      });

      return axiosClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosClient; 