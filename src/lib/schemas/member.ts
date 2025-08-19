import { z } from "zod";

export const MemberSchema = z.object({
  slug: z.string(),
  name: z.string(),
  role: z.string(),
  bioMD: z.string(),
  photo: z.string().url(),
  socials: z.array(
    z.object({
      platform: z.string(),
      url: z.string().url(),
      handle: z.string().optional(),
    })
  ),
  joinedYear: z.number().optional(),
  instruments: z.array(z.string()).optional(),
});

export type Member = z.infer<typeof MemberSchema>;
