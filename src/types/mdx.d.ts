// all of the props for the custom Image Component
// used by the blog
export interface ImageCompProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  num: number;
  description: string;
  creds?: string;
}

// all of the props for the custom SideNote
export interface SideNoteCompProps {
  num: number;
  description: string;
}

// all of the props for the custom InTextCitationComponent
// (the one with the dotted outline)
export interface InTextCitationCompProps {
  type: InTextCitationType;
  name: string;
  authors: string;
  link: string;
}

type InTextCitationType = "video" | "link" | "paper";
