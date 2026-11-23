import { apiGet, apiPost, apiPut, apiDelete } from '../api/http';
import { REMINDER_ENDPOINTS } from '../api/endpoints';

export interface ReminderPayload {
  title: string;
  date: string;
  frequency: number;
  repeatFrequency: number[] | null;
}

export interface UpdateReminderPayload extends ReminderPayload {
  reminderId: string;
  status: number;
}

export interface ReminderApiItem {
  _id: string;
  title: string;
  date: string;
  status: number;
  isDefault?: boolean;
  frequency: number;
  repeatFrequency?: number[] | null;
}

export interface ReminderListResponse {
  status: number;
  message: string;
  data: {
    reminders: ReminderApiItem[];
  };
}

export const getReminders = async (): Promise<ReminderListResponse> => {
  return (await apiGet(REMINDER_ENDPOINTS.REMINDERS)) as ReminderListResponse;
};

export const createReminder = (payload: ReminderPayload) => {
  return apiPost(REMINDER_ENDPOINTS.REMINDERS, payload);
};

export const updateReminder = (payload: UpdateReminderPayload) => {
  return apiPut(REMINDER_ENDPOINTS.REMINDERS, payload);
};

export const deleteReminder = (reminderId: string) => {
  return apiDelete(REMINDER_ENDPOINTS.REMINDERS, {
    params: { reminderId },
  });
};
