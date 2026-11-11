import { AuthState } from '../types/authTypes';

export const SET_EMAIL = 'SET_EMAIL';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const RESET_AUTH = 'RESET_AUTH';

export interface SetEmailAction {
  type: typeof SET_EMAIL;
  payload: string;
}

export interface UpdateProfileAction {
  type: typeof UPDATE_PROFILE;
  payload: Partial<AuthState['profile']>;
}

export interface ResetAuthAction {
  type: typeof RESET_AUTH;
}

export type AuthAction = SetEmailAction | UpdateProfileAction | ResetAuthAction;

export const setEmail = (email: string): SetEmailAction => {
  return {
    type: SET_EMAIL,
    payload: email,
  };
};

export const updateProfile = (
  profile: Partial<AuthState['profile']>,
): UpdateProfileAction => ({
  type: UPDATE_PROFILE,
  payload: profile,
});

export const resetAuth = (): ResetAuthAction => ({
  type: RESET_AUTH,
});
