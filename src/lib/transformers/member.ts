import { type SanityMember } from "@/lib/sanity/api";
import { type Member } from "@/lib/schemas/member";
import { urlFor } from "@/lib/sanity";

export function transformSanityMember(sanityMember: SanityMember): Member {
  return {
    slug: sanityMember.slug.current,
    name: sanityMember.name,
    role: sanityMember.role,
    bioMD: sanityMember.bio,
    photo: urlFor(sanityMember.photo).url(),
    socials: sanityMember.socials || [],
    joinedYear: sanityMember.joinedYear,
    instruments: sanityMember.instruments || [],
  };
}
