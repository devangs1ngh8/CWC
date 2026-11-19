import { apiGet, apiPost } from '../api 2/http';
import { LOGS_ENDPOINTS } from '../api 2/endpoints';
import { LogsResponse, SaveLogRequest } from './@types/types';

export const getLogs = (logDate: string) => {
  return apiGet(`${LOGS_ENDPOINTS.LOGS}?logDate=${logDate}`);
};

export const saveLogs = (payload: SaveLogRequest) => {
  return apiPost<LogsResponse>(LOGS_ENDPOINTS.LOGS, payload);
};
