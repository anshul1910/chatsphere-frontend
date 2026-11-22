import { apiService } from "../core/apiService";
import { API_ENDPOINTS } from "../core/endpoints";
import type {
  AuthResponse,
  LoginPayload,
  MeResponse,
  RegisterPayload,
} from "../../types/auth";

export const authService = {
  register(payload: RegisterPayload): Promise<AuthResponse> {
    return apiService.post<AuthResponse, RegisterPayload>(
      API_ENDPOINTS.AUTH.REGISTER,
      payload,
    );
  },

  login(payload: LoginPayload): Promise<AuthResponse> {
    return apiService.post<AuthResponse, LoginPayload>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload,
    );
  },

  me(): Promise<MeResponse> {
    return apiService.get<MeResponse>(API_ENDPOINTS.AUTH.ME);
  },
};
