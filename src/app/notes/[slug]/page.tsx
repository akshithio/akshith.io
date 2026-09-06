import NoteLayout from "@/components/notes/NoteLayout";
import { getNote, noteSlugs } from "@/notes";
import { notFound } from "next/navigation";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return noteSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) return {};

  return {
    title: note.meta.title,
    description: note.meta.description,
    openGraph: {
      title: note.meta.title,
      description: note.meta.description,
      url: `https://akshith.io/notes/${slug}`,
      siteName: "Akshith Garapati",
      type: "article",
      publishedTime: note.meta.date,
    },
  };
}

export default async function NotePage({ params }: Params) {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) notFound();

  const { Content, meta } = note;

  return (
    <NoteLayout title={meta.title} date={meta.date}>
      <Content />
    </NoteLayout>
  );
}
