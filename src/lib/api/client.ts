import { type Member } from "@/lib/schemas/member";
import { type Festival } from "@/lib/schemas/festival";
import { type Track } from "@/lib/schemas/track";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Generic fetch function with error handling
async function apiRequest<T>(endpoint: string): Promise<T> {
  // Always use relative URLs for API calls - works in both server and client
  const url = `/api${endpoint}`;
  console.log("Making API request to:", url);

  const response = await fetch(url, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    console.error(
      `API request failed: ${response.status} ${response.statusText} for ${url}`
    );
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const result: ApiResponse<T> = await response.json();
  console.log("API response:", result);

  if (!result.success || !result.data) {
    console.error("API error:", result.error);
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
