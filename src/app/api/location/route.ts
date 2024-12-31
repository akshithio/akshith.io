import { NextRequest, NextResponse } from "next/server";

let lastLocation: { city: string; timezone: string } | null = null;

export async function POST(req: NextRequest) {
  try {
    const { city, timezone } = await req.json();

    // Validate the input
    if (!city || !timezone) {
      return NextResponse.json(
        { message: "City and timezone are required" },
        { status: 400 },
      );
    }

    // Save the location data
    lastLocation = { city, timezone };

    // Return the success response
    return NextResponse.json(
      { message: "Location saved successfully", city, timezone },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  if (lastLocation) {
    return NextResponse.json(
      { message: "Location retrieved successfully", ...lastLocation },
      { status: 200 },
    );
  } else {
    return NextResponse.json({ message: "No location found" }, { status: 404 });
  }
}
