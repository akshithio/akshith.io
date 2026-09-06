import SiteMenu from "@/components/layout/SiteMenu";
import { getNotes } from "@/notes";

export async function generateMetadata() {
  return {
    title: "Notes · Akshith Garapati",
    description: "Notes - Akshith Garapati",
    openGraph: {
      title: "Notes · Akshith Garapati",
      description: "Notes - Akshith Garapati",
      url: `https://akshith.io/notes`,
      siteName: "Akshith Garapati",
    },
  };
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className="narrow:grid narrow:min-h-screen narrow:max-w-none narrow:grid-cols-[25.2px_450px_1fr] narrow:grid-rows-[auto_1fr_auto] narrow:items-start narrow:p-0 mx-auto flex min-h-0 max-w-[576px] flex-col px-[18px] pt-[21.6px]">
      <SiteMenu current="/notes" />

      <div className="narrow:col-start-2 narrow:order-none narrow:row-start-2 narrow:mt-[21.6px] narrow:pb-[2em] order-2 mt-[14.4px] pb-[1em]">
        <h3 className="font-display m-0 text-[1.45em] font-bold -tracking-[0.01em]">
          Notes
        </h3>

        {notes.length === 0 ? (
          <p className="text-ink mt-[1em] leading-[16.2px]">Nothing here yet.</p>
        ) : (
          <ul className="text-ink my-[1em] list-disc pl-9 leading-[16.2px]">
            {notes.map((note) => (
              <li key={note.slug} className="mb-[0.7em]">
                <a href={`/notes/${note.slug}`} className="text-link underline">
                  {note.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
