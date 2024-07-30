import { useEffect } from 'react';
import axiosInstance from '../lib/axiosInstance';
import useAuthContext from './useAuthContext';

export default function useAxiosInstance() {
  const { authData } = useAuthContext();

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

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [authData.accessToken]);

  return axiosInstance;
}
