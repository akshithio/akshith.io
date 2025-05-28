import { passenger } from "@/utils/fonts";

export default function BibliographyItemComp(props) {
  return (
    <div className={`${passenger.className} inline w-full font-semibold`} id={props.id}>
      {props.children}
    </div>
  );
}
