/** A diagram plus its caption. */
export default function Figure({
  caption,
  children,
}: {
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-[1.4em]">
      {children}
      {caption ? (
        <figcaption className="text-faded mt-[7.2px] text-[9px] leading-[13.5px]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
