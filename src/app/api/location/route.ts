import { adminDb } from "@/firebaseAdminConfig";
import { z } from "zod";

const LocationDataSchema = z.object({
  country: z.string(),
  region: z.string(),
  timezone: z.string(),
  city: z.string(),
});

const ApiResponseSchema = z.object({
  data: z.array(LocationDataSchema),
});

export async function GET() {
  try {
    const snapshot = await adminDb.collection("location").get();
    const rawData = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    const validationResult = ApiResponseSchema.safeParse({ data: rawData });

    if (!validationResult.success) {
      console.error("Data validation error:", validationResult.error);
      return new Response(
        JSON.stringify({
          error: "Data validation failed",
          details: validationResult.error.format(),
        }),
        { status: 422 },
      );
    }

    return new Response(JSON.stringify(validationResult.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        /* My location changes about once a day. Serve from the CDN for an
           hour, and keep serving the stale copy for a day while it refreshes
           behind the scenes, so Firestore sees a handful of reads either way. */
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
