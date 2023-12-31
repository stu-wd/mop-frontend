import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import { AppStore, useSpotifyStore } from './store/index.tsx';
import { darkMode, lightMode } from './theme/index.tsx';
import { BaseRouter } from './router/index.tsx';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppStore>
      <StateProvider />
    </AppStore>
  </React.StrictMode>,
);
