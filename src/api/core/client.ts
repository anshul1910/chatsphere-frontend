import axios from "axios";
import { tokenStorage } from "../../utils/tokenStorage";

export const AUTH_EXPIRED_EVENT = "auth:expired";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      tokenStorage.clear();
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }
    return Promise.reject(error);
  },
);
