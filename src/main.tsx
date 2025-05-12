import { initializeApp } from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import { AppStore, useSpotifyStore } from './store/index';
import { darkMode, lightMode } from './theme/index';
import { BaseRouter } from './router/index';

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
  databaseUrl?: string;
};

const config: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
};

initializeApp(config);

import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

const db = getFirestore();
const auth = getAuth();
const functions = getFunctions();
const storage = getStorage();

if (
  import.meta.env.VITE_USE_EMULATORS === 'true' &&
  location.hostname === 'localhost'
) {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectStorageEmulator(storage, 'localhost', 9199);
}

const StateProvider = () => {
  const { mode } = useSpotifyStore.getState();
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        style={{
          width: '1.5rem',
        }}
      />
      <ThemeProvider theme={mode === 'dark' ? darkMode : lightMode}>
        <BaseRouter />
      </ThemeProvider>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppStore>
      <StateProvider />
    </AppStore>
  </React.StrictMode>,
);
