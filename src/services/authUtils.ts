import { UserSpecificStorageKeys } from 'src/services/storage/keys';
import { store } from 'src/store';
import { clearAuthData } from 'src/store/slices/authSlice';
import { resetWhenReady } from './navigationRef';
import { SCREEN_NAMES } from 'src/navigation/screenNames';
import { HTTP_STATUS_CODES } from './httpStatusCodes';
import AnalyticsService from 'src/services/analytics';
import { Storage } from './storage';

/**
 * Utility function to handle logout
 * This mirrors the logout mutation logic from authApi but without the API call
 * Clears user-specific storage, auth data, and navigates to auth screen
 *
 * @param logoutReason - Why the logout was triggered. Defaults to
 *   `user_initiated`; the axios interceptor passes `session_expired` when it
 *   triggers a logout from a 401/403 response.
 */
export function handleLogout() {
  // Generic logout event — fire BEFORE we clear auth state so the analytics
  // service can still attach userID / email base params.

  // Clear user-specific storage keys (same as logout mutation)
  Object.values(UserSpecificStorageKeys).forEach(key => {
    Storage.remove(key);
  });

  // Clear auth data from Redux store
  store.dispatch(clearAuthData());

  // Detach Firebase identity so subsequent events (including the AUTH-screen
  // landing) aren't attributed to the expired session's user. Fire-and-forget;
  // the helper swallows its own errors so it can't disrupt navigation.
  AnalyticsService.resetUserIdentity();

  // Navigate to auth screen
  resetWhenReady(SCREEN_NAMES.AUTH);
}

export function isSessionTimeoutError(error: any): boolean {
  const status = error?.response?.status;
  if (
    status === HTTP_STATUS_CODES.UNAUTHORIZED ||
    status === HTTP_STATUS_CODES.FORBIDDEN
  ) {
    return true;
  }
  return false;
}
