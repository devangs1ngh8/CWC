import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AuthState, Profile } from './authTypes';

const initialState: AuthState = {
  email: '',
  profile: {
    name: '',
    phone: '',
    dob: null,
    height: '',
    heightUnit: 'CM',
    weight: '',
    weightUnit: 'KG',

    lactating: '',
    contraceptive: '',
    bleedTimeline: '',
    lastMenstruationDate: null,
    cycleLength: '',

    community: '',
    state: '',
    city: '',
    parish: '',
    pastor: '',
    receiveUpdates: false,

    // preferences: {
    //   periodPredictions: false,
    //   cycleDeviationDetection: false,
    //   fertilityStatusEstimation: false,
    // },
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
        ...state.profile,
        ...action.payload,
      };
    },

    resetAuth: () => initialState,
  },
});

export const { setEmail, updateProfile, resetAuth } = authSlice.actions;

export default authSlice.reducer;
