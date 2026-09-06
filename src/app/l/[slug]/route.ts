import { adminDb } from "@/firebaseAdminConfig";
import type { DocumentSnapshot } from "firebase-admin/firestore";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const LinkSchema = z.object({
  url: z.string().url(),
});

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  let snapshot: DocumentSnapshot;
  try {
    snapshot = await adminDb.collection("links").doc(slug).get();
  } catch (error) {
    console.error(`Error looking up link "${slug}":`, error);
    return new Response("Internal Server Error", { status: 500 });
  }

  if (!snapshot.exists) notFound();

  const parsed = LinkSchema.safeParse(snapshot.data());
  if (!parsed.success) {
    console.error(`Invalid link doc for "${slug}":`, parsed.error);
    notFound();
  }

  return NextResponse.redirect(parsed.data.url, 302);
}
