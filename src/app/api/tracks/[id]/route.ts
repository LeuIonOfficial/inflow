import { NextResponse } from "next/server";
import { getTrackById } from "@/lib/sanity/api";
import { transformSanityTrack } from "@/lib/transformers/track";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sanityTrack = await getTrackById(id);

    if (!sanityTrack) {
      return NextResponse.json(
        {
          success: false,
          error: "Track not found",
        },
        { status: 404 }
      );
    }

    // Transform Sanity data to standard format
    const track = transformSanityTrack(sanityTrack);

    return NextResponse.json({
      success: true,
      data: track,
    });
  } catch (error) {
    console.error("Error fetching track:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch track",
      },
      { status: 500 }
    );
  }
}

export const revalidate = 60; // Revalidate every 60 seconds
