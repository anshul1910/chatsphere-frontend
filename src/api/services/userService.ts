import { apiService } from "../core/apiService";
import { API_ENDPOINTS } from "../core/endpoints";
import type { MeResponse } from "../../types/auth";
import type {
  SearchUsersResponse,
  UpdateProfilePayload,
  UserProfileResponse,
} from "../../types/user";

export const userService = {
  searchUsers(
    query: string,
    signal?: AbortSignal,
  ): Promise<SearchUsersResponse> {
    return apiService.get<SearchUsersResponse>(API_ENDPOINTS.USERS.SEARCH, {
      params: { q: query },
      signal,
    });
  },

  getUser(id: string): Promise<UserProfileResponse> {
    return apiService.get<UserProfileResponse>(API_ENDPOINTS.USERS.BY_ID(id));
  },

  updateProfile(payload: UpdateProfilePayload): Promise<MeResponse> {
    return apiService.patch<MeResponse, UpdateProfilePayload>(
      API_ENDPOINTS.USERS.ME,
      payload,
    );
  },
};
