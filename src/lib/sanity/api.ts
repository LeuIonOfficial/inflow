import { client, queries } from "../sanity";

// Festival API functions
export async function getAllFestivals() {
  return await client.fetch(queries.festivals);
}

export async function getFestivalBySlug(slug: string) {
  return await client.fetch(queries.festivalBySlug, { slug });
}

// Member API functions
export async function getAllMembers() {
  return await client.fetch(queries.members);
}

export async function getMemberBySlug(slug: string) {
  return await client.fetch(queries.memberBySlug, { slug });
}

// Track API functions
export async function getAllTracks() {
  return await client.fetch(queries.tracks);
}

export async function getTrackById(id: string) {
  return await client.fetch(queries.trackById, { id });
}

// Type definitions based on Sanity schema
export interface SanityFestival {
  _id: string;
  slug: { current: string };
  name: string;
  date: string;
  location: {
    city: string;
    country: string;
    venue: string;
    coordinates?: { lat: number; lng: number };
  };
  stage?: string;
  description: string;
  photos: Array<{
    asset: { _id: string; url: string };
    caption?: string;
    photographer?: string;
  }>;
  videos: Array<{
    url: string;
    title: string;
    thumbnail?: { asset: { url: string } };
    platform: "youtube" | "vimeo" | "direct";
  }>;
  setlist: string[];
  pressQuotes: Array<{
    quote: string;
    source: string;
    author?: string;
    url?: string;
  }>;
  ticketUrl?: string;
  status: "upcoming" | "completed" | "cancelled";
}

export interface SanityMember {
  _id: string;
  slug: { current: string };
  name: string;
  role: string;
  bio: string;
  photo: { asset: { _id: string; url: string } };
  socials: Array<{
    platform: string;
    url: string;
    handle?: string;
  }>;
  joinedYear?: number;
  instruments: string[];
}

export interface SanityTrack {
  _id: string;
  trackId: { current: string };
  title: string;
  duration: string;
  cover?: { asset: { _id: string; url: string } };
  audioFile: { asset: { _id: string; url: string } };
  album?: string;
  year?: number;
  isSingle: boolean;
  genre?: string;
  description?: string;
}
