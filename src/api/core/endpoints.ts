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
    AVATAR: "users/me/avatar",
    BY_ID: (id: string) => `/users/${encodeURIComponent(id)}`,
  },
} as const;
