import { AuthState } from '../types/authTypes';

import {
  AuthAction,
  SET_EMAIL,
  UPDATE_PROFILE,
  RESET_AUTH,
} from '../actions/authActions';

const initialState: AuthState = {
  email: '',
  profile: {
    name: '',
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
  },
};

const authReducer = (
  state: AuthState = initialState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      };

    case RESET_AUTH:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
