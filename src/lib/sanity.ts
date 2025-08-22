import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Replace these with your actual Sanity project details
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

console.log("Sanity client config:", {
  projectId,
  dataset,
  apiVersion,
  hasToken: !!process.env.SANITY_API_READ_TOKEN,
  tokenLength: process.env.SANITY_API_READ_TOKEN?.length,
  nodeEnv: process.env.NODE_ENV,
});

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "published",
});

const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => builder.image(source);

// GROQ queries for fetching data
export const queries = {
  festivals: `*[_type == "festival"] | order(date desc) {
    _id,
    slug,
    name,
    date,
    location,
    stage,
    description,
    photos[] {
      asset->{
        _id,
        url
      },
      caption,
      photographer
    },
    videos,
    setlist,
    pressQuotes,
    ticketUrl,
    status
  }`,

  festivalBySlug: `*[_type == "festival" && slug.current == $slug][0] {
    _id,
    slug,
    name,
    date,
    location,
    stage,
    description,
    photos[] {
      asset->{
        _id,
        url
      },
      caption,
      photographer
    },
    videos,
    setlist,
    pressQuotes,
    ticketUrl,
    status
  }`,

  members: `*[_type == "member"] | order(joinedYear asc) {
    _id,
    slug,
    name,
    role,
    bio,
    photo {
      asset->{
        _id,
        url
      }
    },
    socials,
    joinedYear,
    instruments
  }`,

  memberBySlug: `*[_type == "member" && slug.current == $slug][0] {
    _id,
    slug,
    name,
    role,
    bio,
    photo {
      asset->{
        _id,
        url
      }
    },
    socials,
    joinedYear,
    instruments
  }`,

  tracks: `*[_type == "track"] | order(year desc) {
    _id,
    trackId,
    title,
    duration,
    cover {
      asset->{
        _id,
        url
      }
    },
    audioFile {
      asset->{
        _id,
        url
      }
    },
    album,
    year,
    isSingle,
    genre,
    description
  }`,

  trackById: `*[_type == "track" && trackId == $id][0] {
    _id,
    trackId,
    title,
    duration,
    cover {
      asset->{
        _id,
        url
      }
    },
    audioFile {
      asset->{
        _id,
        url
      }
    },
    album,
    year,
    isSingle,
    genre,
    description
  }`,
};
