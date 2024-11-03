let latestLocation = null; // Store only the latest location

export async function POST(req) {
  const { city, timezone } = await req.json();

  // Validate the input
  if (!city || !timezone) {
    return new Response(
      JSON.stringify({ message: "City and timezone are required" }),
      { status: 400 },
    );
  }

  // Store the latest location
  latestLocation = { city, timezone };
  return new Response(
    JSON.stringify({ message: "Location saved successfully", city, timezone }),
    { status: 201 },
  );
}

export async function GET() {
  // Handle GET request
  if (latestLocation) {
    return new Response(JSON.stringify(latestLocation), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: "No location found" }), {
      status: 404,
    });
  }
}
