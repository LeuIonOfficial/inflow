import { Metadata } from "next";

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "music.song" | "music.album" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

const defaultMetadata = {
  title: "INFLOW - Rock Band from Moldova",
  description:
    "Join INFLOW, Moldova's premier rock band, on their journey through festivals, albums, and unforgettable live performances. Experience the raw energy that defines our music.",
  keywords: [
    "INFLOW",
    "rock band",
    "Moldova",
    "live music",
    "festivals",
    "concerts",
    "albums",
    "music",
  ],
  image: "/images/og-default.jpg",
  url: "https://inflow.md",
};

export function generateSEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
}: SEOProps): Metadata {
  const fullTitle =
    title === defaultMetadata.title ? title : `${title} | INFLOW`;
  const fullUrl = url ? `${defaultMetadata.url}${url}` : defaultMetadata.url;
  const imageUrl = image
    ? `${defaultMetadata.url}${image}`
    : `${defaultMetadata.url}${defaultMetadata.image}`;

  const allKeywords = [...defaultMetadata.keywords, ...keywords, ...tags];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords.join(", "),

    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: "RockBand",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: "@rockband",
      site: "@rockband",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: fullUrl,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateJSONLD(data: any) {
  return {
    "@context": "https://schema.org",
    ...data,
  };
}

// Common JSON-LD schemas
export const organizationSchema = {
  "@type": "MusicGroup",
  name: "INFLOW",
  description:
    "Experience the raw energy and powerful sound of INFLOW, Moldova's premier rock band.",
  url: "https://inflow.md",
  sameAs: [
    "https://facebook.com/inflow.band",
    "https://twitter.com/inflow_band",
    "https://instagram.com/inflow.band",
    "https://youtube.com/inflow.band",
  ],
  genre: "Rock",
  foundingDate: "2018",
  foundingLocation: {
    "@type": "Place",
    name: "Chișinău, Moldova",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+373-22-123-456",
    contactType: "booking",
    email: "booking@inflow.md",
  },
};

export function musicEventSchema(event: {
  name: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
    city: string;
    country: string;
  };
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@type": "MusicEvent",
    name: event.name,
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    location: {
      "@type": "Place",
      name: event.location.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.location.address,
        addressLocality: event.location.city,
        addressCountry: event.location.country,
      },
    },
    description: event.description,
    url: event.url,
    ...(event.image && { image: event.image }),
    performer: {
      "@type": "MusicGroup",
      name: "INFLOW",
      url: "https://inflow.md",
    },
  };
}

export function musicRecordingSchema(track: {
  name: string;
  duration: string;
  url: string;
  album?: string;
  datePublished?: string;
  genre?: string;
}) {
  return {
    "@type": "MusicRecording",
    name: track.name,
    duration: track.duration,
    url: track.url,
    ...(track.album && {
      inAlbum: { "@type": "MusicAlbum", name: track.album },
    }),
    ...(track.datePublished && { datePublished: track.datePublished }),
    ...(track.genre && { genre: track.genre }),
    byArtist: {
      "@type": "MusicGroup",
      name: "INFLOW",
      url: "https://inflow.md",
    },
  };
}
