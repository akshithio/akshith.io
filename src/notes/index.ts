import { noteLoaders } from "./registry";
import type { Note, NoteModule } from "@/types/notes";

export type { Note, NoteMeta, NoteModule } from "@/types/notes";

export function noteSlugs() {
  return Object.keys(noteLoaders);
}

async function loadNote(slug: string): Promise<NoteModule | undefined> {
  const load = noteLoaders[slug];
  return load ? await load() : undefined;
}

/** Metadata + content component for one note, or undefined if it doesn't exist. */
export async function getNote(slug: string) {
  const mod = await loadNote(slug);
  if (!mod) return undefined;
  return { slug, meta: mod.meta, Content: mod.default };
}

/** Every note, newest first. */
export async function getNotes(): Promise<Note[]> {
  const notes = await Promise.all(
    noteSlugs().map(async (slug) => {
      const mod = await loadNote(slug);
      return mod ? { slug, ...mod.meta } : undefined;
    }),
  );

  return notes
    .filter((note): note is Note => !!note)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatNoteDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
