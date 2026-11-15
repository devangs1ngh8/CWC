import { apiGet, apiPost } from '../api 2/http';

export const getLogs = (date: string) => {
  return apiGet('/user/logs', {
    params: { logDate: date },
  });
};

export const saveLogs = (data: any) => {
  return apiPost('/user/logs', data);
};
