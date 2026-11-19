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
  data?: {
    userId?: string;
  };
}

export interface UpdateProfileRequest {
  basicDetails?: Partial<{
    name: string;
    dob: string;
    heightUnit: number;
    height: string;
    weightUnit: number;
    weight: string;
  }>;

  healthDetail?: Partial<{
    lactationStatus: number;
    contraceptionStatus: number;
    bleedingTimeline: number;
    cycleLength: number;
    lastMenstruationDate: string;
  }>;

  communityPreference?: Partial<{
    isCatholic: number;
    comment: string;
    state: string;
    city: string;
    parish: string;
    pastor: string;
    committedToCatholicTeachings: number;
  }>;
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
  data: {
    userId: string;
    name: string;
    email: string;
    phone?: string;
    completionStep: number;

    basicDetails?: {
      name: string;
      dob: string;
      height: string;
      weight: string;
      heightUnit: number;
      weightUnit: number;
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
      state: string;
      city: string;
      parish: string;
      pastor: string;
      committedToCatholicTeachings: number;
    };

    personalPreference?: {
      periodsPredictions: number;
      fertilityPredictions: number;
      cycleDeviation: number;
      periodNotifications: number;
      fertilityStatusNotification: number;
    };

    isSubscriptionPurchased: boolean;
    isSubscriptionExpired: boolean;
  };
  timestamp: string;
}

export interface ChangePasswordRequest {
  password: string;
  userId: string;
}

export interface ChangePasswordResponse {
  status: number;
  success: boolean;
  message: string;
  data?: unknown;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface EducationItem {
  id: string | number;
  title: string;
  description: string;
  image?: string;
  videoUrl?: string;
  [key: string]: any;
}

export interface EducationResponse {
  status: number;
  success?: boolean;
  message?: string;
  data: any;
}
