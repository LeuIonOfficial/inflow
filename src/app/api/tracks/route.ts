import { NextResponse } from "next/server";
import { getAllTracks } from "@/lib/sanity/api";
import { transformSanityTrack } from "@/lib/transformers/track";

export async function GET() {
  try {
    const sanityTracks = await getAllTracks();

    // Transform Sanity data to standard format
    const tracks = sanityTracks.map(transformSanityTrack);

    return NextResponse.json({
      success: true,
      data: tracks,
    });
  } catch (error) {
    console.error("Error fetching tracks:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch tracks",
      },
      { status: 500 }
    );
  }
}

export const revalidate = 60; // Revalidate every 60 seconds
