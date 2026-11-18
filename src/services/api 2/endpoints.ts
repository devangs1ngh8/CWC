export const API_VERSION = 'v1/';
export const API_VERSION_2 = 'v2/';

export const AUTH_ENDPOINTS = {
  LOGIN: 'user/onboarding/login',
  REGISTER: 'user/onboarding/register',
  VERIFY_OTP: 'user/onboarding/verify-otp',
  RESEND_OTP: 'user/onboarding/resend-otp',
  VALIDATE_OTP: 'user/onboarding/validate-otp',
  RESEND_USER_OTP: 'user/onboarding/resend-user-otp',
  UPDATE_PROFILE: 'user/onboarding/update-profile',
  COMPLETE_ONBOARDING: 'user/onboarding/complete-onboarding',
  GET_PROFILE: 'user/onboarding/profile',
  CHANGE_PASSWORD: 'user/onboarding/change-password',
  UPDATE_PASSWORD: 'user/onboarding/update-password',
};

export const COMMUNITY_ENDPOINTS = {
  STATES: 'user/community/states',
  CITIES: 'user/community/city',
  PARISH: 'user/community/parish',
  PASTOR: 'user/community/pastor',
};

export const HOME_ENDPOINTS = {
  EDUCATION: 'user/home/education',
};
