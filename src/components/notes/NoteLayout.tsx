import SiteMenu from "@/components/layout/SiteMenu";
import { formatNoteDate } from "@/notes";

export default function NoteLayout({
  title,
  date,
  icon,
  children,
}: {
  title: string;
  date: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="narrow:grid narrow:min-h-screen narrow:max-w-none narrow:grid-cols-[25.2px_max(450px,33vw)_1fr] narrow:grid-rows-[auto_1fr_auto] narrow:items-start narrow:p-0 mx-auto flex min-h-0 max-w-[576px] flex-col px-[18px] pt-[21.6px]">
      <SiteMenu current="/notes" />

      <article className="narrow:col-start-2 narrow:order-none narrow:row-start-2 narrow:mt-[24px] narrow:pb-[4em] note order-2 mt-[20px] min-w-0 pb-[2em]">
        <header className="mb-[24px]">
          {icon ? <div className="mb-[14px]">{icon}</div> : null}
          <h1 className="note-title">{title}</h1>
          <p className="note-date">
            <time dateTime={date}>{formatNoteDate(date)}</time>
          </p>
        </header>

        {children}
      </article>
    </div>
  );
}
