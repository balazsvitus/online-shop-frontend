import { useEffect } from 'react';
import axiosInstance from '../lib/axiosInstance';
import useAuthContext from './useAuthContext';

export default function useAxiosInstance() {
  const { authData, logout } = useAuthContext();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${authData.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.request.eject(responseInterceptor);
    };
  }, [authData.accessToken, logout]);

  return axiosInstance;
}
