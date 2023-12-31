import { z } from 'zod';
import { SpotifyUserSchema } from './spotify';

export const AppStateSchema = z.object({
  mode: z.literal('dark').or(z.literal('light')),
  isLoggedIn: z.boolean(),
  spotifyUser: SpotifyUserSchema.nullable(),
});

export type AppState = z.infer<typeof AppStateSchema>;
