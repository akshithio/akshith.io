export default function CitationSuperscriptComp(props) {
  return (
    <a href={"#" + props.children} className="font-semibold">
      <sup>{props.children}</sup>
    </a>
  );
}
