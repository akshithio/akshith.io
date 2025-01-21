export default function BibliographyHolderComp(props) {
  return (
    <span>
      <span
        id="citation-holder"
        className="mt-8 grid grid-cols-2 gap-4 border-t-2 border-dotted pt-4 text-aBlack dark:text-aWhite"
      >
        {props.children}
      </span>
    </span>
  );
}
