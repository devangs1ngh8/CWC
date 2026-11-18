import { AUTH_ENDPOINTS } from '../api 2/endpoints';
import { apiGet, apiPost, apiPut, apiPatch } from '../api 2/http';

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyOtpRequest,
  OtpResponse,
  UpdateProfileResponse,
  UpdateProfileRequest,
  ForgotPasswordResponse,
  ForgotPasswordRequest,
  CompleteOnboardingRequest,
  CompleteOnboardingResponse,
  GetProfileResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  UpdatePasswordRequest,
} from '../auth/@types/types';

export const loginUser = async (payload: LoginRequest) => {
  const response = await apiPost<LoginResponse>(AUTH_ENDPOINTS.LOGIN, payload);

  if (response?.status === 200 && response?.data?.accessToken) {
    return response.data;
  }

  throw new Error(response?.message || 'Login failed');
};

export const registerUser = async (payload: RegisterRequest) => {
  const response = await apiPost<RegisterResponse>(
    AUTH_ENDPOINTS.REGISTER,
    payload,
  );

  if (response?.status === 200 && response?.data?.userId) {
    return response.data;
  }

  throw new Error(response?.message || 'Registration failed');
};

export const verifyOtp = async (payload: VerifyOtpRequest) => {
  console.log('VERIFY OTP PAYLOAD:', {
    type: payload.type,
    otpLength: payload.otp.length,
    userId: payload.userId,
  });

  try {
    const response = await apiPost<OtpResponse>(
      AUTH_ENDPOINTS.VERIFY_OTP,
      payload,
    );

    return response;
  } catch (error: any) {
    console.log('VERIFY OTP STATUS:', error.response?.status);
    console.log('VERIFY OTP ERROR BODY:', error.response?.data);
    console.log('VERIFY OTP SENT BODY:', error.config?.data);
    console.log('VERIFY OTP URL:', error.config?.url);

    throw error;
  }
};

export const resendOtp = async (userId: string) => {
  const response = await apiGet<OtpResponse>(AUTH_ENDPOINTS.RESEND_OTP, {
    params: { userId },
  });

  if (response?.status === 200) {
    return response;
  }

  throw new Error(response?.message || 'Unable to resend OTP');
};

export const updateUserProfile = async (payload: UpdateProfileRequest) => {
  const response = await apiPut<UpdateProfileResponse>(
    AUTH_ENDPOINTS.UPDATE_PROFILE,
    payload,
  );

  if (response?.status === 200) {
    return response;
  }

  throw new Error(response?.message || 'Profile update failed');
};

export const forgotPassword = async (
  payload: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  return await apiGet<ForgotPasswordResponse>(
    '/user/onboarding/forget-password',
    {
      params: payload,
    },
  );
};

export const completeOnboarding = async (
  payload: CompleteOnboardingRequest,
): Promise<CompleteOnboardingResponse> => {
  return await apiPost<CompleteOnboardingResponse>(
    AUTH_ENDPOINTS.COMPLETE_ONBOARDING,
    payload,
  );
};

export const getUserProfile = async (): Promise<GetProfileResponse> => {
  const response = await apiGet<GetProfileResponse>(AUTH_ENDPOINTS.GET_PROFILE);

  if (response?.status === 200) {
    return response;
  }

  throw new Error(response?.message || 'Failed to fetch profile');
};

export const changePassword = async (
  payload: ChangePasswordRequest,
): Promise<ChangePasswordResponse> => {
  try {
    const response = await apiPatch<ChangePasswordResponse>(
      AUTH_ENDPOINTS.CHANGE_PASSWORD,
      payload,
    );

    if (response?.status === 200) {
      return response;
    }

    throw new Error(response?.message || 'Password reset failed');
  } catch (error: any) {
    console.log('CHANGE PASSWORD STATUS:', error.response?.status);
    console.log('CHANGE PASSWORD ERROR:', error.response?.data);
    console.log('CHANGE PASSWORD URL:', error.config?.url);

    throw error;
  }
};

export const updatePassword = async (
  payload: UpdatePasswordRequest,
): Promise<ChangePasswordResponse> => {
  const response = await apiPatch<ChangePasswordResponse>(
    AUTH_ENDPOINTS.UPDATE_PASSWORD,
    payload,
  );

  if (response?.status === 200 && response?.success) {
    return response;
  }

  throw new Error(response?.message || 'Password update failed');
};
