import axios from 'axios';
import { useAuthStore } from '../store/AuthStore';

const axiosInstance = axios.create({
  baseURL: 'https://backend-practice.eurisko.me/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});



axiosInstance.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken;

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
  
}, error => {
  return Promise.reject(error);
});


axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    console.log("hello from axios interceptor");
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;

        if (!refreshToken) {
          useAuthStore.getState().clearTokens();
          return Promise.reject(error);
        }

        const response = await axios.post(
          'https://backend-practice.eurisko.me/api/auth/refresh-token', {refreshToken});


        if (response.data.success) {
          const {accessToken, refreshToken: newRefreshToken} = response.data.data;
          useAuthStore.getState().setTokens(accessToken, newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        useAuthStore.getState().clearTokens();
      }
    }


    return Promise.reject(error);
  }
);



export default axiosInstance;

