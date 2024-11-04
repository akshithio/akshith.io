import { NextRequest, NextResponse } from "next/server";

let lastResponse: Response | null = null;

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

    // Create the success response and store it
    const response = NextResponse.json(
      { message: "Location saved successfully", city, timezone },
      { status: 201 },
    );
    lastResponse = response;

    // Return the response
    return response;
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  if (lastResponse) {
    return lastResponse;
  } else {
    return NextResponse.json({ message: "No location found" }, { status: 404 });
  }
}
