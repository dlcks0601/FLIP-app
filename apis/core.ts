import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import useAuthStore from '@/store/authStore';
import { API_URL } from '@/constants/config';
import { AuthResponse } from '@/types/auth.type';
import * as SecureStore from 'expo-secure-store';

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터: accessToken 자동 주입
axiosInstance.interceptors.request.use((config) => {
  const { jwt } = useAuthStore.getState();
  if (jwt.accessToken) {
    config.headers.Authorization = `Bearer ${jwt.accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// 🔄 토큰 리프레시 요청 함수
const refreshToken = async (): Promise<AuthResponse> => {
  const { jwt } = useAuthStore.getState();

  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/refresh`,
    {
      refreshToken: jwt.refreshToken,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );

  return response.data;
};

// 응답 인터셉터: accessToken 만료 시 자동 재발급
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const authStore = useAuthStore.getState();

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
              };
              resolve(axiosInstance(originalRequest));
            },
            reject: (err) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        const data = await refreshToken();

        // 상태 갱신
        authStore.setJwt(data.jwt);
        authStore.setSpotify(data.spotify);
        authStore.setUser(data.user);

        // SecureStore에 최신 정보 저장
        const authData = {
          jwt: data.jwt,
          spotify: data.spotify,
          user: data.user,
        };
        await SecureStore.setItemAsync('plify-auth', JSON.stringify(authData));

        // 헤더 재설정
        axiosInstance.defaults.headers.Authorization = `Bearer ${data.jwt.accessToken}`;
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${data.jwt.accessToken}`,
        };

        processQueue(null, data.jwt.accessToken);
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        authStore.logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
