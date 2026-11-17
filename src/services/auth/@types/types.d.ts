export interface LoginRequest {
  type: number;
  email: string;
  password: string;
}

export interface RegisterRequest {
  type: number;
  email: string;
  password: string;
}

export interface VerifyOtpRequest {
  type: number;
  otp: string;
  userId: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    userId: string;
  };
}

export interface RegisterResponse {
  status: number;
  message: string;
  data: {
    userId: string;
  };
}

export interface OtpResponse {
  status: number;
  message: string;
  data?: unknown;
}

export interface UpdateProfileRequest {
  basicDetails?: {
    name: string;
    dob: string;
    heightUnit: number;
    height: string;
    weightUnit: number;
    weight: string;
  };

  healthDetail?: {
    lactationStatus: number;
    contraceptionStatus: number;
    bleedingTimeline: number;
    cycleLength: number;
    lastMenstruationDate: string;
  };

  communityPreference?: {
    isCatholic: number;
    comment: string;
    state: string;
    city: string;
    parish: string;
    pastor: string;
    committedToCatholicTeachings: number;
  };
}

export interface UpdateProfileResponse {
  status: number;
  message: string;
  data?: any;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResendForgotPasswordOtpRequest {}

export interface ForgotPasswordResponse {
  status: number;
  message: string;
  data: {
    userId: string;
  };
  timestamp: string;
}

export interface CompleteOnboardingRequest {
  step: number;

  basicDetails: {
    name: string;
    dob: string;
    heightUnit: number;
    height: string;
    weightUnit: number;
    weight: string;
  };

  healthDetail?: {
    lactationStatus: number;
    contraceptionStatus: number;
    bleedingTimeline: number;
    cycleLength: number;
    lastMenstruationDate: string;
  };

  communityPreference?: {
    isCatholic: number;
    comment: string;
    state: string;
    city: string;
    parish: string;
    pastor: string;
    committedToCatholicTeachings: number;
  };
}

export interface CompleteOnboardingResponse {
  status: number;
  message: string;
  data?: unknown;
}

export interface GetProfileResponse {
  status: number;
  message: string;
  data?: unknown;
}
