import { z } from "zod";

export const TrackSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.string(), // Format: "MM:SS"
  cover: z.string().url().optional(),
  audioFile: z.object({
    asset: z.object({
      _id: z.string(),
      url: z.string().url(),
    }),
  }),
  audioUrl: z.string().url(), // Derived from audioFile.asset.url for player compatibility
  album: z.string().optional(),
  year: z.number().optional(),
  isSingle: z.boolean().default(false),
  genre: z.string().optional(),
  description: z.string().optional(),
});

export type Track = z.infer<typeof TrackSchema>;
