import { z } from 'zod';

export const SpotifyUserSchema = z.object({
  country: z.string(),
  display_name: z.string(),
  email: z.string().email(),
  explicit_content: z.object({
    filter_enabled: z.boolean(),
    filter_locked: z.boolean(),
  }),
  external_urls: z.object({
    spotify: z.string(),
  }),
  followers: z.object({
    href: z.string().nullable(),
    total: z.number(),
  }),
  href: z.string().url(),
  id: z.string(),
  images: z.array(
    z.object({
      url: z.string().url(),
      height: z.number(),
      width: z.number(),
    }),
  ),
  product: z.string(),
  type: z.string(),
  uri: z.string(),
});

export type SpotifyUser = z.infer<typeof SpotifyUserSchema>;
