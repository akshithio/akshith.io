import SiteMenu from "@/components/layout/SiteMenu";
import { formatNoteDate } from "@/notes";

export default function NoteLayout({
  title,
  date,
  children,
}: {
  title: string;
  date: string;
  children: React.ReactNode;
}) {
  return (
    <div className="narrow:grid narrow:min-h-screen narrow:max-w-none narrow:grid-cols-[25.2px_450px_1fr] narrow:grid-rows-[auto_1fr_auto] narrow:items-start narrow:p-0 mx-auto flex min-h-0 max-w-[576px] flex-col px-[18px] pt-[21.6px]">
      <SiteMenu current="/notes" />

      <div className="narrow:col-start-2 narrow:order-none narrow:row-start-2 narrow:mt-[21.6px] narrow:pb-[2em] note order-2 mt-[14.4px] pb-[1em]">
        <h3 className="font-display m-0 text-[1.45em] font-bold -tracking-[0.01em]">
          {title}
        </h3>
        <p className="text-faded m-0 mb-[1.6em] text-[9px] leading-[16.2px]">
          {formatNoteDate(date)}
        </p>

        {children}

        <p className="mt-[2.4em] mb-0 leading-[16.2px]">
          <a href="/notes" className="text-link underline">
            ← all notes
          </a>
        </p>
      </div>
    </div>
  );
}
