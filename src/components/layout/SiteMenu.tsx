import Eyes from "@/components/layout/Eyes";

const sections = [{ href: "/notes", label: "Notes" }];

export default function SiteMenu({ current }: { current?: string }) {
  return (
    <>
      <a
        href="/"
        aria-label="Akshith Garapati"
        className="narrow:mb-0 narrow:mt-[23.4px] order-0 col-start-2 row-start-1 mb-[16.2px] leading-[0]"
      >
        <Eyes />
      </a>

      <div className="font-display narrow:mb-[27px] narrow:w-[135px] order-3 col-start-2 row-start-3 mb-[36px] w-auto text-left">
        <h1 className="m-0 text-[12.6px] font-normal text-black">
          <a href="/" className="hover:underline">
            Akshith Garapati
          </a>
        </h1>
        <ul className="narrow:mt-0 narrow:block m-0 mt-[3.6px] flex list-none flex-wrap gap-x-[12.6px] p-0">
          {sections.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-link inline-block"
                aria-current={href === current ? "page" : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
