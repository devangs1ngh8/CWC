export interface Profile {
  // Personal Information
  name: string;
  phone: string;
  dob: string | null;
  height: string;
  heightUnit: string;
  weight: string;
  weightUnit: string;

  // Your Cycles
  lactating: string;
  contraceptive: string;
  bleedTimeline: string;
  lastMenstruationDate: string | null;
  cycleLength: string;

  // Catholic Community
  community: string;
  state: string;
  city: string;
  parish: string;
  pastor: string;
  receiveUpdates: boolean;

  preferences: UserPreferences;
}

export interface AuthState {
  email: string;
  profile: Profile;
}

export interface UserPreferences {
  periodPredictions: boolean;
  cycleDeviationDetection: boolean;
  fertilityStatusEstimation: boolean;
}
