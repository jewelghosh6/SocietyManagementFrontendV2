import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import config from '../environments/config';

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  timeout: 6000,
});

const setupInterceptors = () => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      } else {
        console.warn('No access token found in localStorage');
      }
      return config;
    },
    (error: AxiosError) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
      if (!originalRequest) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401) {
        localStorage.clear();
        window.location.href = '/auth/sign-in';
        return Promise.reject(error);
      }

      if (
        error.response?.status === 403 &&
        originalRequest.url !== `${config.API_URL}/auth/generate-access-token` &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const res = await axios.post(`${config.API_URL}/auth/generate-access-token`, { refreshToken });

            if (res.status === 200) {
              localStorage.setItem('accessToken', res.data.accessToken);
              axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
              originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
              return axiosInstance(originalRequest);
            }
          } catch (err) {
            localStorage.clear();
            window.location.href = '/auth/sign-in';
            return Promise.reject(err);
          }
        } else {
          localStorage.clear();
          window.location.href = '/auth/sign-in';
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
};

setupInterceptors();

export { axiosInstance };
