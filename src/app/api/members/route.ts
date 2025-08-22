import { NextResponse } from "next/server";
import { getAllMembers } from "@/lib/sanity/api";
import { transformSanityMember } from "@/lib/transformers/member";

export async function GET() {
  try {
    const sanityMembers = await getAllMembers();

    // Transform Sanity data to standard format
    const members = sanityMembers.map(transformSanityMember);

    return NextResponse.json({
      success: true,
      data: members,
    });
  } catch (error) {
    console.error("Error fetching members:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch members",
      },
      { status: 500 }
    );
  }
}

export const revalidate = 60; // Revalidate every 60 seconds
