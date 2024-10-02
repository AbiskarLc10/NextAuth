import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme/themeSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Combine reducers
const rootReducer = combineReducers({
  theme: themeReducer,
});

// Redux-Persist config
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializableCheck for persist
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Type exports
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;
