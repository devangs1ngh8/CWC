import axios, { AxiosError, AxiosHeaders } from 'axios';
import { Storage } from '../storage';
import { StorageKeys } from '../storage/keys';
import DeviceInfo from 'react-native-device-info';
import { API_VERSION } from './endpoints';
import { isAndroid } from '../../utils/metrics';

const API_BASE_URL = 'https://cwc-api.appskeeper.in';
export const http = axios.create({
  baseURL: `${API_BASE_URL}/${API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

http.interceptors.request.use(async configuration => {
  const config = configuration;

  config.headers = AxiosHeaders.from(config.headers);

  (config as any).metadata = {
    ...(config as any).metadata,
    startTime: Date.now(),
  };

  const [token, deviceModel, language] = await Promise.all([
    Storage.get<string>(StorageKeys.AUTH_TOKEN),
    Storage.get<string>(StorageKeys.DEVICE_MODEL),
    Storage.get<string>('en'),
  ]);

  // console.log('AUTH TOKEN EXISTS:', !!token);
  // console.log('AUTH TOKEN LENGTH:', token?.length ?? 0);

  const isAuthRequest =
    config.url?.includes('user/onboarding/login') ||
    config.url?.includes('user/onboarding/register') ||
    config.url?.includes('user/onboarding/verify-otp') ||
    config.url?.includes('user/onboarding/resend-otp') ||
    config.url?.includes('user/onboarding/forget-password') ||
    config.url?.includes('user/onboarding/validate-otp') ||
    config.url?.includes('user/onboarding/resend-user-otp') ||
    config.url?.includes('user/onboarding/change-password');

  if (isAuthRequest) {
    config.auth = undefined;
    config.headers.set('Authorization', 'BASIC Q1dDX1VTRVI6Q1dDX1BBU1NXT1JE');
  } else if (token) {
    config.auth = undefined;
    config.headers.set('Authorization', `Bearer ${token}`);
  } else {
    config.auth = {
      username: 'CWC_USER',
      password: 'CWC_PASSWORD',
    };
    config.headers.delete('Authorization');
  }

  config.headers.set('lang', 'en');
  config.headers.set('device_type', isAndroid ? '1' : '2');
  config.headers.set('device_name', deviceModel || '');
  config.headers.set('device_id', DeviceInfo.getUniqueIdSync());

  config.headers.set(
    'timezone',
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  // console.log('REQUEST METHOD:', config.method?.toUpperCase());
  // console.log('REQUEST URL:', `${config.baseURL}${config.url}`);

  return config;
});

/**
 * Computes elapsed wall-clock time since the request was sent, using the
 * `startTime` metadata stamped by the request interceptor. Returns `undefined`
 * when the timestamp is missing (e.g. retry/cancelled flows) so we don't emit
 * a misleading 0.
 */
const getDurationMs = (config: any): number | undefined => {
  const startTime = config?.metadata?.startTime;
  return typeof startTime === 'number' ? Date.now() - startTime : undefined;
};

/** Strips query string so endpoint analytics don't leak tokens / PII. */
const getEndpointPath = (rawUrl: string | undefined) =>
  (rawUrl ?? '').split('?')[0];

http.interceptors.response.use(
  response => {
    // eslint-disable-next-line no-console
    console.log('API Response: ', response);

    return response;
  },
  (error: AxiosError<{ message?: string }>) => {
    // eslint-disable-next-line no-console
    console.log('API Error: ', error);

    console.log('API ERROR STATUS:', error.response?.status);
    console.log('API ERROR DATA:', error.response?.data);

    // Generic api_error analytics event — keep payload primitive-only and
    // strip URL query string so we don't leak tokens/PII.
    // AnalyticsService.logEvent(EVENTS.API_ERROR, {
    //   error_code: String(error?.response?.status ?? error?.code ?? 'unknown'),
    //   error_message:
    //     error?.response?.data?.message ?? error?.message ?? 'unknown',
    //   endpoint: getEndpointPath(error?.config?.url),
    //   method: (error?.config?.method ?? '').toUpperCase(),
    //   duration_ms: getDurationMs(error?.config),
    // });

    // if (isSessionTimeoutError(error)) {
    //   const token = Storage.get(StorageKeys.AUTH_TOKEN);
    //   if (token) {
    //     showErrorToast(error?.response?.data?.message ?? 'Unauthorized');
    //     handleLogout(LOGOUT_REASONS.SESSION_EXPIRED);
    //   }
    // }
    // You can add centralized error handling or logging here
    return Promise.reject(error);
  },
);

/**
 * API Methods
 */

export async function apiGet<T>(
  url: string,
  config?: Parameters<typeof http.get>[1],
): Promise<T> {
  const res = await http.get<T>(url, config);
  return res.data;
}
export async function apiPost<T>(
  url: string,
  data?: unknown,
  config?: Parameters<typeof http.post>[2],
): Promise<T> {
  const res = await http.post<T>(url, data, config);
  return res.data;
}

export async function apiPut<T>(
  url: string,
  data?: unknown,
  config?: Parameters<typeof http.put>[2],
): Promise<T> {
  const res = await http.put<T>(url, data, config);
  return res.data;
}

export async function apiPatch<T>(
  url: string,
  data?: unknown,
  config?: Parameters<typeof http.patch>[2],
): Promise<T> {
  const res = await http.patch<T>(url, data, config);
  return res.data;
}

export async function apiDelete<T>(
  url: string,
  config?: Parameters<typeof http.delete>[1],
): Promise<T> {
  const res = await http.delete<T>(url, config);
  return res.data;
}
