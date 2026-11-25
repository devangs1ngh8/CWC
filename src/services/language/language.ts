import { apiPatch } from '../api/http';
import { LANGUAGE_ENDPOINTS } from '../api/endpoints';

export type LanguageCode = 'en' | 'es';

interface LanguagePreferenceResponse {
  status: number;
  message: string;
  data: Record<string, unknown>;
  timestamp: string;
}

interface LanguagePreferencePayload {
  languagePrefernce: LanguageCode;
}

export const updateLanguagePreference = (
  payload: LanguagePreferencePayload,
) => {
  return apiPatch<LanguagePreferenceResponse>(
    LANGUAGE_ENDPOINTS.UPDATE_PREFERENCE,
    payload,
  );
};
