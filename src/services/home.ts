import { HOME_ENDPOINTS } from './api 2/endpoints';
import { apiGet } from './api 2/http';
import type { EducationResponse } from './auth/@types/types';

export const getEducationList = async (
  page: number = 1,
  limit: number = 10,
  search: string = '',
): Promise<EducationResponse> => {
  const response = await apiGet<EducationResponse>(HOME_ENDPOINTS.EDUCATION, {
    params: {
      page,
      limit,
      ...(search.trim() ? { search: search.trim() } : {}),
    },
  });

  return response;
};
