import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import  AuthSlice from './reducers/auth';
import userDahboard from './reducers/userDashboard';
// import { AuthSlice } from './reducers/auth';
// import Auth from './reducers/auth';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedAuth = persistReducer(persistConfig, AuthSlice);

export const store = configureStore({
  reducer: {
    Auth: persistedAuth,
    userDahboard
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      //   ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      //   ignoredPaths: ['items.dates'],
      // },
      serializableCheck: false
      // serializableCheck: false,
    }),
});

export const persistorStore = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
