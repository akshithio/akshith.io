export async function POST(req: any) {
  const { city, timezone } = await req.json();

  // Validate the input
  if (!city || !timezone) {
    return new Response(
      JSON.stringify({ message: "City and timezone are required" }),
      { status: 400 },
    );
  }

  // Store the latest location in localStorage
  const location = { city, timezone };
  localStorage.setItem("latestLocation", JSON.stringify(location));

  return new Response(
    JSON.stringify({ message: "Location saved successfully", city, timezone }),
    { status: 201 },
  );
}

export async function GET() {
  // Retrieve the latest location from localStorage
  const storedLocation = localStorage.getItem("latestLocation");

  if (storedLocation) {
    return new Response(storedLocation, { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: "No location found" }), {
      status: 404,
    });
  }
}
