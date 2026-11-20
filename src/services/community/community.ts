import { apiGet } from '../api/http';
import { COMMUNITY_ENDPOINTS } from '../api/endpoints';

interface CommunityApiResponse<T> {
  status: number;
  message: string;
  data: T;
  timestamp?: string;
}

export const getCommunityStates = async () => {
  const response = await apiGet<CommunityApiResponse<string[]>>(
    COMMUNITY_ENDPOINTS.STATES,
  );

  return response.data;
};

export const getCommunityCities = async (state: string) => {
  const response = await apiGet<CommunityApiResponse<string[]>>(
    COMMUNITY_ENDPOINTS.CITIES,
    { params: { state } },
  );

  return response.data;
};

export const getCommunityParishes = async (state: string, city: string) => {
  const response = await apiGet<CommunityApiResponse<string[]>>(
    COMMUNITY_ENDPOINTS.PARISH,
    { params: { state, city } },
  );

  return response.data;
};

export const getCommunityPastors = async (
  state: string,
  city: string,
  parish: string,
) => {
  const response = await apiGet<CommunityApiResponse<string[]>>(
    COMMUNITY_ENDPOINTS.PASTOR,
    { params: { state, city, parish } },
  );

  return response.data;
};
