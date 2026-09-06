import type { NoteModule } from "@/types/notes";

/**
 * The one place a note gets registered. Add a folder at `src/notes/<slug>`
 * with an `index.tsx` that exports `meta` and a default component. Keep that
 * note's diagrams and other assets inside the same folder, then add a line
 * here — everything else (routing, the index, metadata, the sitemap) follows
 * from it.
 *
 * The imports are lazy so a note is only loaded when its page is rendered.
 */
export const noteLoaders: Record<string, () => Promise<NoteModule>> = {};
