import { env } from "@/env";
import { adminDb } from "@/firebaseAdminConfig";
import { createHash } from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

interface ViewCount {
  totalViews: number;
  uniqueViewers: string[];
  lastUpdated: number;
}

function hashIdentifier(identifier: string): string {
  const SECRET = env.VIEWER_HASH_SECRET;
  if (!SECRET) {
    throw new Error("VIEWER_HASH_SECRET not configured");
  }
  return createHash("sha256")
    .update(identifier + SECRET)
    .digest("hex");
}

async function generateViewerId(headersList): Promise<string> {
  // Network Information
  const forwarded = headersList.get("x-forwarded-for");
  const realIP = headersList.get("x-real-ip");
  const cfConnectingIP = headersList.get("cf-connecting-ip");
  const trueClientIP = headersList.get("true-client-ip");
  const xClientIP = headersList.get("x-client-ip");
  const ip = forwarded
    ? forwarded.split(",")[0]?.trim()
    : realIP || cfConnectingIP || trueClientIP || xClientIP || "";

  // Geographic/Network Info (if using Cloudflare or similar)
  const cfIpCountry = headersList.get("cf-ipcountry") || "";
  const cfRay = headersList.get("cf-ray") || "";
  const timezone = headersList.get("cf-timezone") || "";
  const asn = headersList.get("cf-asn") || "";

  // Detailed Browser/Client Information
  const userAgent = headersList.get("user-agent") || "";
  const acceptLanguage = headersList.get("accept-language") || "";
  const accept = headersList.get("accept") || "";
  const acceptEncoding = headersList.get("accept-encoding") || "";
  const acceptCharset = headersList.get("accept-charset") || "";

  // Modern Browser Identification
  const secChUa = headersList.get("sec-ch-ua") || "";
  const secChUaPlatform = headersList.get("sec-ch-ua-platform") || "";
  const secChUaMobile = headersList.get("sec-ch-ua-mobile") || "";
  const secChUaModel = headersList.get("sec-ch-ua-model") || "";
  const secChUaFullVersion = headersList.get("sec-ch-ua-full-version") || "";
  const secChUaFullVersionList =
    headersList.get("sec-ch-ua-full-version-list") || "";
  const secChUaPlatformVersion =
    headersList.get("sec-ch-ua-platform-version") || "";

  // Connection Information
  const connection = headersList.get("connection") || "";
  const via = headersList.get("via") || "";
  const forwaredProto = headersList.get("x-forwarded-proto") || "";
  const xRequestedWith = headersList.get("x-requested-with") || "";

  // Display/Device Information
  const viewport = headersList.get("viewport-width") || "";
  const dpr = headersList.get("dpr") || "";
  const deviceMemory = headersList.get("device-memory") || "";
  const hardwareConcurrency = headersList.get("hardware-concurrency") || "";

  // Browser Security and Behavior
  const secFetchDest = headersList.get("sec-fetch-dest") || "";
  const secFetchMode = headersList.get("sec-fetch-mode") || "";
  const secFetchSite = headersList.get("sec-fetch-site") || "";
  const secFetchUser = headersList.get("sec-fetch-user") || "";

  // Additional Headers
  const downlink = headersList.get("downlink") || "";
  const ect = headersList.get("ect") || "";
  const rtt = headersList.get("rtt") || "";
  const save_data = headersList.get("save-data") || "";

  // Request Context
  const host = headersList.get("host") || "";
  const origin = headersList.get("origin") || "";

  // Combine all factors with a separator unlikely to appear in the values
  const identifyingFactors = [
    // Network Identity
    ip,
    cfIpCountry,
    cfRay,
    timezone,
    asn,

    // Browser Identity
    userAgent,
    acceptLanguage,
    accept,
    acceptEncoding,
    acceptCharset,

    // Modern Browser Details
    secChUa,
    secChUaPlatform,
    secChUaMobile,
    secChUaModel,
    secChUaFullVersion,
    secChUaFullVersionList,
    secChUaPlatformVersion,

    // Connection Details
    connection,
    via,
    forwaredProto,
    xRequestedWith,

    // Device Capabilities
    viewport,
    dpr,
    deviceMemory,
    hardwareConcurrency,

    // Security Context
    secFetchDest,
    secFetchMode,
    secFetchSite,
    secFetchUser,

    // Performance/Network Capabilities
    downlink,
    ect,
    rtt,
    save_data,

    // Request Context
    host,
    origin,
  ];

  return identifyingFactors.join("||");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const docRef = adminDb.collection("blog-views").doc(slug);
    const doc = await docRef.get();

    // Return 0 for new articles
    if (!doc.exists) {
      return NextResponse.json({ views: 0 }, { status: 200 });
    }

    const data = doc.data() as ViewCount;
    return NextResponse.json({ views: data.totalViews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching view count:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    const headersList = await headers();
    const referer = headersList.get("referer");

    if (!referer) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const urlParts = new URL(referer).pathname.split("/");
    const slug = urlParts[urlParts.length - 1];

    if (!slug || slug.trim() === "") {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const viewerId = await generateViewerId(headersList);
    const hashedId = hashIdentifier(viewerId);
    const docRef = adminDb.collection("blog-views").doc(slug);
    let viewCount = 0;

    const VIEWER_LIMIT = 10000;

    await adminDb.runTransaction(async (transaction) => {
      const doc = await transaction.get(docRef);

      if (!doc.exists) {
        const initialData: ViewCount = {
          totalViews: 1,
          uniqueViewers: [hashedId],
          lastUpdated: Date.now(),
        };
        transaction.set(docRef, initialData);
        viewCount = 1;
      } else {
        const data = doc.data() as ViewCount;

        if (!data.uniqueViewers.includes(hashedId)) {
          const updatedViewers = [...data.uniqueViewers, hashedId].slice(
            -VIEWER_LIMIT,
          );

          transaction.update(docRef, {
            totalViews: data.totalViews + 1,
            uniqueViewers: updatedViewers,
            lastUpdated: Date.now(),
          });
          viewCount = data.totalViews + 1;
        } else {
          viewCount = data.totalViews;
        }
      }
    });

    return NextResponse.json({ views: viewCount }, { status: 200 });
  } catch (error) {
    console.error("Error updating view count:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
