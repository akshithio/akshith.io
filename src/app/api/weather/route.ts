import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const country = searchParams.get("country");

  if (!city) {
    return NextResponse.json(
      { error: "City parameter is required" },
      { status: 400 },
    );
  }

  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${WEATHER_API_KEY}`,
    );

    if (!weatherResponse.ok) {
      throw new Error("Weather API request failed");
    }

    const weatherData = await weatherResponse.json();
    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 },
    );
  }
}
