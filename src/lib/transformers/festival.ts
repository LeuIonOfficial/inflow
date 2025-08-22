import { type SanityFestival } from "@/lib/sanity/api";
import { type Festival } from "@/lib/schemas/festival";
import { urlFor } from "@/lib/sanity";

export function transformSanityFestival(
  sanityFestival: SanityFestival
): Festival {
  return {
    slug: sanityFestival.slug.current,
    name: sanityFestival.name,
    date: sanityFestival.date,
    location: {
      city: sanityFestival.location.city,
      country: sanityFestival.location.country,
      venue: sanityFestival.location.venue,
      coordinates: sanityFestival.location.coordinates,
    },
    stage: sanityFestival.stage,
    descriptionMD: sanityFestival.description,
    photos: (sanityFestival.photos || [])
      .filter((photo) => photo.asset)
      .map((photo) => ({
        url: urlFor(photo.asset).url(),
        caption: photo.caption,
        photographer: photo.photographer,
      })),
    videos: (sanityFestival.videos || []).map((video) => ({
      url: video.url,
      title: video.title,
      thumbnail: video.thumbnail ? urlFor(video.thumbnail).url() : undefined,
      platform: video.platform,
    })),
    setlist: sanityFestival.setlist || [],
    pressQuotes: (sanityFestival.pressQuotes || []).map((quote) => ({
      quote: quote.quote,
      source: quote.source,
      author: quote.author,
      url: quote.url,
    })),
    ticketUrl: sanityFestival.ticketUrl,
    status: sanityFestival.status,
  };
}
