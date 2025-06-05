import axios from 'axios';
import {useAuthStore} from '../store/AuthStore';
import Config from 'react-native-config';

// Log config values immediately for debugging
// console.log('=== REACT NATIVE CONFIG DEBUG ===');
// console.log('Config object:', Config);
// console.log('Config.BASE_URL:', Config.BASE_URL);
// console.log('Config.API_URL:', Config.API_URL);
// console.log('Config.ENV:', Config.ENV);
// console.log('Config keys:', Object.keys(Config));
// console.log('==================================');
// console.log(Config.API_URL + 'auth/refresh-token');

const axiosInstance = axios.create({
  baseURL: Config.API_URL || 'https://backend-practice.eurisko.me/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = useAuthStore.getState().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;

    // console.log('#########################');
    // console.log('CONFIG OBJECT:', Config);
    // console.log('CONFIG API_URL:', Config.API_URL);
    // console.log('#########################');

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // console.log("hello from axios interceptor");

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;

        if (!refreshToken) {
          useAuthStore.getState().clearTokens();
          return Promise.reject(error);
        }

        const response = await axios.post(
          Config.API_URL + 'auth/refresh-token',
          {refreshToken},
        );

        if (response.data.success) {
          const {accessToken, refreshToken: newRefreshToken} =
            response.data.data;
          useAuthStore.getState().setTokens(accessToken, newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        useAuthStore.getState().clearTokens();
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
