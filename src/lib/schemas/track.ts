import { z } from "zod";

export const TrackSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.string(), // Format: "MM:SS"
  cover: z.string().url().optional(),
  audioUrl: z.string().url(),
  album: z.string().optional(),
  year: z.number().optional(),
  isSingle: z.boolean().default(false),
  genre: z.string().optional(),
  description: z.string().optional(),
});

export type Track = z.infer<typeof TrackSchema>;
