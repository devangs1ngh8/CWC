import { AUTH_ENDPOINTS } from '../api 2/endpoints';
import { apiGet, apiPost } from '../api 2/http';

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyOtpRequest,
  OtpResponse,
} from '../auth/@types/types';

// Login API
export const loginUser = async (payload: LoginRequest) => {
  const response = await apiPost<LoginResponse>(AUTH_ENDPOINTS.LOGIN, payload);

  if (response?.status === 200 && response?.data?.accessToken) {
    return response.data;
  }

  throw new Error(response?.message || 'Login failed');
};

// Signup API
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

// Verify OTP API
export const verifyOtp = async (payload: VerifyOtpRequest) => {
  const response = await apiPost<OtpResponse>(
    AUTH_ENDPOINTS.VERIFY_OTP,
    payload,
  );

  if (response?.status === 200 || response?.status === 201) {
    return response;
  }

  throw new Error(response?.message || 'OTP verification failed');
};

// Resend OTP API
export const resendOtp = async (userId: string) => {
  const response = await apiGet<OtpResponse>(AUTH_ENDPOINTS.RESEND_OTP, {
    params: { userId },
  });

  if (response?.status === 200) {
    return response;
  }

  throw new Error(response?.message || 'Unable to resend OTP');
};
