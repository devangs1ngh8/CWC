import { apiGet, apiPost } from '../api/http';
import { LOGS_ENDPOINTS } from '../api/endpoints';
import { LogsResponse, SaveLogRequest } from './@types/types';

export const getLogs = (logDate: string) => {
  return apiGet<LogsResponse>(`${LOGS_ENDPOINTS.LOGS}?logDate=${logDate}`);
};

export const saveLogs = (payload: SaveLogRequest) => {
  return apiPost<LogsResponse>(LOGS_ENDPOINTS.LOGS, payload);
};
