import axios from 'axios';
import { API_BASE_URL, getAuthToken, removeAuthToken } from './config';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      await removeAuthToken();
    }
    const message =
      error?.response?.data?.message || error.message || 'Network request failed';
    return Promise.reject(new Error(message));
  }
);
