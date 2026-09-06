import SiteMenu from "@/components/layout/SiteMenu";

export default function NotFoundPage() {
  return (
    <div className="narrow:grid narrow:min-h-screen narrow:max-w-none narrow:grid-cols-[25.2px_450px_1fr] narrow:grid-rows-[auto_1fr_auto] narrow:items-start narrow:p-0 mx-auto flex min-h-0 max-w-[576px] flex-col px-[18px] pt-[21.6px]">
      <SiteMenu />

      <div className="narrow:col-start-2 narrow:order-none narrow:row-start-2 narrow:mt-[21.6px] narrow:pb-[2em] order-2 mt-[14.4px] pb-[1em]">
        <h3 className="font-display m-0 text-[1.45em] font-bold -tracking-[0.01em]">
          Page not found
        </h3>

        <p className="text-ink mt-[1em] leading-[16.2px]">
          This page doesn&apos;t exist.{" "}
          <a href="/" className="text-link underline">
            Go home
          </a>
          .
        </p>
      </div>
    </div>
  );
}
