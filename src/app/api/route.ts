let lastResponse: Response | null = null;

export async function POST(req: any) {
  const { city, timezone } = await req.json();

  // Validate the input
  if (!city || !timezone) {
    lastResponse = new Response(
      JSON.stringify({ message: "City and timezone are required" }),
      { status: 400 },
    );
    return lastResponse;
  }

  // Create the success response and store it
  lastResponse = new Response(
    JSON.stringify({ message: "Location saved successfully", city, timezone }),
    { status: 201 },
  );

  return lastResponse;
}

export async function GET() {
  if (lastResponse) {
    return lastResponse;
  } else {
    return new Response(JSON.stringify({ message: "No location found" }), {
      status: 404,
    });
  }
}
