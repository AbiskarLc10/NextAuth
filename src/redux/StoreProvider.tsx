'use client';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './store'; // Import the store instance directly
import { PersistGate } from 'redux-persist/integration/react';

// Props type for StoreProvider
interface StoreProviderProps {
  children: ReactNode;
}

// StoreProvider component definition
export default function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>
    <PersistGate persistor={persistor}>
    {children}
    </PersistGate>
    </Provider>;
}

