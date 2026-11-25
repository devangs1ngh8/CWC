import { apiGet, apiPut } from '../api/http';
import { TRACKING_PREFERENCE_ENDPOINTS } from '../api/endpoints';

export interface HCPPreference {
  hcpId: string;
  name: string;
  isEnabled: boolean;
}

export interface TrackingPreferenceData {
  manageSymptoms: boolean;
  myInsightsWithHCP: boolean;
  urinaryHormoneAnalysis: {
    fshTestResult: boolean;
    lhTestResult: boolean;
    estrogenLevelTest: boolean;
    progesteroneTestResult: boolean;
  };
  sharedWithHCPs: HCPPreference[];
}

interface TrackingPreferenceResponse {
  status: number;
  message: string;
  data: TrackingPreferenceData;
  timestamp: string;
}

interface UpdateTrackingPreferenceResponse {
  status: number;
  message: string;
  data: Record<string, unknown>;
  timestamp: string;
}

export const getTrackingPreference = () => {
  return apiGet<TrackingPreferenceResponse>(
    TRACKING_PREFERENCE_ENDPOINTS.TRACKING_PREFERENCE,
  );
};

export const updateTrackingPreference = (
  payload: UpdateTrackingPreferencePayload,
) => {
  return apiPut<UpdateTrackingPreferenceResponse>(
    TRACKING_PREFERENCE_ENDPOINTS.TRACKING_PREFERENCE,
    payload,
  );
};

export type UpdateTrackingPreferencePayload = {
  manageSymptoms?: boolean;
  myInsightsWithHCP?: boolean;
  urinaryHormoneAnalysis?: Partial<
    TrackingPreferenceData['urinaryHormoneAnalysis']
  >;
  sharedWithHCPs?: HCPPreference[];
};
