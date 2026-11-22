import type { AxiosRequestConfig } from "axios";
import { api } from "./client";

export const apiService = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await api.get<T>(url, config);
    return data;
  },

  async post<T, B = unknown>(
    url: string,
    body?: B,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const { data } = await api.post<T>(url, body, config);
    return data;
  },

  async put<T, B = unknown>(
    url: string,
    body?: B,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const { data } = await api.put<T>(url, body, config);
    return data;
  },

  async patch<T, B = unknown>(
    url: string,
    body?: B,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const { data } = await api.patch<T>(url, body, config);
    return data;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await api.delete<T>(url, config);
    return data;
  },
};
