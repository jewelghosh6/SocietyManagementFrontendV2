// useAxiosInterceptors.tsx
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../environments/config';

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  timeout: 6000,
});
const useAxiosInterceptors = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptorId = axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem('accessToken');
        console.log('accessToken', accessToken);

        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptorId = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401) {
          localStorage.clear();
          navigate('/auth/sign-in');
          return Promise.reject(error);
        }

        if (
          error.response.status === 403 &&
          originalRequest.url !== `${config.API_URL}/auth/generate-access-token` &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            try {
              const res = await axios.post(`${config.API_URL}/auth/generate-access-token`, {
                refreshToken,
              });

              if (res.status === 200) {
                localStorage.setItem('accessToken', res.data.accessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
                return axiosInstance(originalRequest);
              }
            } catch (err) {
              localStorage.clear();
              navigate('/auth/sign-in');
              return Promise.reject(err);
            }
          } else {
            localStorage.clear();
            navigate('/auth/sign-in');
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptorId);
      axiosInstance.interceptors.response.eject(responseInterceptorId);
    };
  }, [navigate]);

  return axiosInstance;
};

export default useAxiosInterceptors;
