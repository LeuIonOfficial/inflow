import { NextResponse } from "next/server";
import { getAllFestivals } from "@/lib/sanity/api";
import { transformSanityFestival } from "@/lib/transformers/festival";

export async function GET() {
  try {
    const sanityFestivals = await getAllFestivals();

    // Transform Sanity data to standard format
    const festivals = sanityFestivals.map(transformSanityFestival);

    return NextResponse.json({
      success: true,
      data: festivals,
    });
  } catch (error) {
    console.error("Error fetching festivals:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch festivals",
      },
      { status: 500 }
    );
  }
}

export const revalidate = 60; // Revalidate every 60 seconds
