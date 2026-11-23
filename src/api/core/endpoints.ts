export const API_ENDPOINTS = {
  HEALTH: "/health",
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    ME: "/auth/me",
  },
  USERS: {
    SEARCH: "/users/search",
    ME: "/users/me",
    BY_ID: (id: string) => `/users/${encodeURIComponent(id)}`,
  },
} as const;
