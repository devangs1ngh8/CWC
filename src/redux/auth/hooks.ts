import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch } from 'redux';

import type { AuthState } from './types/authTypes';
import type { AuthAction } from './actions/authActions';

export const useAppDispatch = () => useDispatch<Dispatch<AuthAction>>();

export const useAppSelector = <T>(selector: (state: AuthState) => T): T =>
  useSelector(selector);
