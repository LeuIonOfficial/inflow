import { type Member } from "@/lib/schemas/member";
import { type Festival } from "@/lib/schemas/festival";
import { type Track } from "@/lib/schemas/track";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Get the base URL for API requests
function getApiBaseUrl(): string {
  return "http://localhost:3000";
}

const API_BASE = `${getApiBaseUrl()}/api`;

// Generic fetch function with error handling
async function apiRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const result: ApiResponse<T> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || "Unknown API error");
  }

  return result.data;
}

// Members API
export async function getMembers(): Promise<Member[]> {
  return apiRequest<Member[]>("/members");
}

export async function getMemberBySlug(slug: string): Promise<Member> {
  return apiRequest<Member>(`/members/${slug}`);
}

// Festivals API
export async function getFestivals(): Promise<Festival[]> {
  return apiRequest<Festival[]>("/festivals");
}

export async function getFestivalBySlug(slug: string): Promise<Festival> {
  return apiRequest<Festival>(`/festivals/${slug}`);
}

// Tracks API
export async function getTracks(): Promise<Track[]> {
  return apiRequest<Track[]>("/tracks");
}

export async function getTrackById(id: string): Promise<Track> {
  return apiRequest<Track>(`/tracks/${id}`);
}

// Client-side API functions (for use in client components)
export const api = {
  members: {
    getAll: () => fetch("/api/members").then((r) => r.json()),
    getBySlug: (slug: string) =>
      fetch(`/api/members/${slug}`).then((r) => r.json()),
  },
  festivals: {
    getAll: () => fetch("/api/festivals").then((r) => r.json()),
    getBySlug: (slug: string) =>
      fetch(`/api/festivals/${slug}`).then((r) => r.json()),
  },
  tracks: {
    getAll: () => fetch("/api/tracks").then((r) => r.json()),
    getById: (id: string) => fetch(`/api/tracks/${id}`).then((r) => r.json()),
  },
};
