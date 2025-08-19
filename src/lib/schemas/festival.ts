import { z } from "zod";

export const FestivalSchema = z.object({
  slug: z.string(),
  name: z.string(),
  date: z.string(), // ISO date string
  location: z.object({
    city: z.string(),
    country: z.string(),
    venue: z.string(),
    coordinates: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .optional(),
  }),
  stage: z.string().optional(),
  descriptionMD: z.string(),
  photos: z.array(
    z.object({
      url: z.string().url(),
      caption: z.string().optional(),
      photographer: z.string().optional(),
    })
  ),
  videos: z.array(
    z.object({
      url: z.string().url(),
      title: z.string(),
      thumbnail: z.string().url().optional(),
      platform: z.enum(["youtube", "vimeo", "direct"]),
    })
  ),
  setlist: z.array(z.string()),
  pressQuotes: z.array(
    z.object({
      quote: z.string(),
      source: z.string(),
      author: z.string().optional(),
      url: z.string().url().optional(),
    })
  ),
  ticketUrl: z.string().url().optional(),
  status: z.enum(["upcoming", "completed", "cancelled"]).default("completed"),
});

export type Festival = z.infer<typeof FestivalSchema>;
