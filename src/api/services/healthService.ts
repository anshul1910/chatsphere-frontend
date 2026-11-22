import { apiService } from "../core/apiService";
import { API_ENDPOINTS } from "../core/endpoints";
import type { HealthResponse } from "../../types/health";

export const healthService = {
  getHealth(): Promise<HealthResponse> {
    return apiService.get<HealthResponse>(API_ENDPOINTS.HEALTH);
  },
};
