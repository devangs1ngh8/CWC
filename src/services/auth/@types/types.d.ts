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
