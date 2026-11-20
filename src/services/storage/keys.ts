export const AppSpecificStorageKeys = {
  APP_THEME: 'app_theme',
  LANGUAGE: 'language',
  HAS_SEEN_TUTORIAL: 'has_seen_tutorial',
  FCM_TOKEN: 'fcm_token',
  DEVICE_MODEL: 'device_model',
  INITIAL_DEEPLINK_OPENED: 'initial_deeplink_opened',
};

export const UserSpecificStorageKeys = {
  AUTH_TOKEN: 'auth_token',
  USER_ID: 'user_id',
  ACCOUNT_CREATION_DATE: 'account_creation_date',
  SUBSCRIPTION: 'subscription',
};

export const StorageKeys = {
  ...AppSpecificStorageKeys,
  ...UserSpecificStorageKeys,
  LOGS_SELECTIONS: 'logs_selections',
  LOGS_DETAILS: 'logs_details',
} satisfies Record<string, string>;

export type StorageKey =
  | (typeof StorageKeys)[keyof typeof StorageKeys]
  | `logs_selections_${string}`
  | `logs_details_${string}`;
