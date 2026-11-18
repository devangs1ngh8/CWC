import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Slice imports
import authReducer from './slice/authSlice';
import subscriptionReducer from './slice/subscriptionSlice';
import logsReducer from './slice/logsSlice';

// Persist auth state
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  subscription: subscriptionReducer,
  logs: logsReducer,
});

// Configure store
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export store
export default store;
