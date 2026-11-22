import axois from "axios";

export const api = axois.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true,
});
