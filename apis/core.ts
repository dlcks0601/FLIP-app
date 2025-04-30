import useAuthStore from '@/store/authStore';
import axios from 'axios';
import { API_URL } from '@/constants/config';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
axiosInstance.interceptors.request.use((config) => {
  const { jwt } = useAuthStore.getState();
  if (jwt.accessToken) {
    config.headers.Authorization = `Bearer ${jwt.accessToken}`;
  }
  return config;
});

export default axiosInstance;
