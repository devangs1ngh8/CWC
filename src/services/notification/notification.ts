import { apiPatch } from '../api/http';
import { NOTIFICATION_ENDPOINTS } from '../api/endpoints';

interface NotificationResponse {
  status: number;
  message: string;
  data: Record<string, unknown>;
  timestamp: string;
}

interface NotificationPayload {
  push: 0 | 1;
}

export const updateNotificationSetting = (payload: NotificationPayload) => {
  return apiPatch<NotificationResponse>(
    NOTIFICATION_ENDPOINTS.UPDATE_SETTING,
    payload,
  );
};
