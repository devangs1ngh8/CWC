import { apiPatch } from '../api/http';
import { AUTH_ENDPOINTS } from '../api/endpoints';

export interface ManageGoalRequest {
  periodsPredictions: number;
  fertilityPredictions: number;
  cycleDeviation: number;
  periodNotifications: number;
  fertilityStatusNotification: number;
}

export interface ManageGoalResponse {
  status: number;
  message: string;
  data: {
    personalPreference: ManageGoalRequest;
  };
  timestamp: string;
}

export const updateManageGoals = (payload: ManageGoalRequest) => {
  return apiPatch<ManageGoalResponse>(AUTH_ENDPOINTS.MANAGE_GOAL, payload);
};
