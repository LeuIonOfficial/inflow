import { type SanityTrack } from "@/lib/sanity/api";
import { type Track } from "@/lib/schemas/track";
import { urlFor } from "@/lib/sanity";

export function transformSanityTrack(sanityTrack: SanityTrack): Track {
  return {
    id: sanityTrack.trackId.current,
    title: sanityTrack.title,
    duration: sanityTrack.duration,
    cover: sanityTrack.cover ? urlFor(sanityTrack.cover).url() : undefined,
    audioUrl: sanityTrack.audioUrl,
    album: sanityTrack.album,
    year: sanityTrack.year,
    isSingle: sanityTrack.isSingle,
    genre: sanityTrack.genre,
    description: sanityTrack.description,
  };
}
