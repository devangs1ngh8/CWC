import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AuthState, Profile } from './authTypes';

const initialState: AuthState = {
  userId: '',
  email: '',
  profile: {
    basicDetails: {
      name: '',
      dob: null,
      height: '',
      heightUnit: 'CM',
      weight: '',
      weightUnit: 'KG',
    },

    healthDetail: {
      lactationStatus: '',
      contraceptionStatus: '',
      bleedingTimeline: '',
      lastMenstruationDate: null,
      cycleLength: '',
    },

    communityPreference: {
      isCatholic: 0,
      committedToCatholicTeachings: 0,
      state: '',
      city: '',
      parish: '',
      pastor: '',
    },

    personalPreference: {
      periodsPredictions: 1,
      fertilityPredictions: 0,
      cycleDeviation: 0,
      periodNotifications: 0,
      fertilityStatusNotification: 0,
    },
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      state.profile = {
        basicDetails: {
          ...state.profile.basicDetails,
          ...action.payload.basicDetails,
        },

        healthDetail: {
          ...state.profile.healthDetail,
          ...action.payload.healthDetail,
        },

        communityPreference: {
          ...state.profile.communityPreference,
          ...action.payload.communityPreference,
        },

        personalPreference: {
          ...state.profile.personalPreference,
          ...action.payload.personalPreference,
        },
      };
    },

    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },

    resetAuth: () => initialState,
  },
});

export const { setEmail, setUserId, updateProfile, resetAuth } =
  authSlice.actions;

export default authSlice.reducer;
