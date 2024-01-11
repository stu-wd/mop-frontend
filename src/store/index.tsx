import { create } from 'zustand';
import { AppState } from '../models/state';
import { ReactElement } from 'react';

export const useSpotifyStore = create<AppState>((set) => ({
  mode: 'dark',
  isLoggedIn: false,
  spotifyUser: null,
  spotifyStuser: null,
}));

type AppStoreProps = {
  children: ReactElement;
};

export const AppStore: React.FC<AppStoreProps> = ({ children }) => {
  return children;
};
