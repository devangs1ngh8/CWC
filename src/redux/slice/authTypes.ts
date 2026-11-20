export interface BasicDetails {
  name: string;
  dob: string | null;
  height: string;
  heightUnit: string;
  weight: string;
  weightUnit: string;
}

export interface HealthDetail {
  lactationStatus: string;
  contraceptionStatus: string;
  bleedingTimeline: string;
  lastMenstruationDate: string | null;
  cycleLength: string;
}

export interface CommunityPreference {
  isCatholic: number;
  state: string;
  city: string;
  parish: string;
  pastor: string;
  committedToCatholicTeachings: number;
}

export interface Profile {
  basicDetails: BasicDetails;
  healthDetail: HealthDetail;
  communityPreference: CommunityPreference;
  personalPreference: PersonalPreference;
}

export interface AuthState {
  userId: string;
  email: string;
  profile: Profile;
}

export interface PersonalPreference {
  periodsPredictions: number;
  fertilityPredictions: number;
  cycleDeviation: number;
  periodNotifications: number;
  fertilityStatusNotification: number;
}
