import type { ComponentType } from "react";

export type NoteMeta = {
  title: string;
  /** ISO date, YYYY-MM-DD. Used for ordering and for the byline. */
  date: string;
  /** Used for <meta> and OpenGraph descriptions, not shown on the page. */
  description: string;
};

export type NoteModule = {
  meta: NoteMeta;
  default: ComponentType;
};

export type Note = NoteMeta & { slug: string };
