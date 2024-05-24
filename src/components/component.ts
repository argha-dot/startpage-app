import { ComponentContianerPropsI } from "@/components/container";

export enum ComponentsKind {
  Music = "music",
  General = "general",
  Note = "note",
  Options = "options",
  Link = "link",
}

export type ComponentsT =
  | ({ kind: ComponentsKind.Music } & Partial<ComponentContianerPropsI>)
  | ({ kind: ComponentsKind.General } & Partial<ComponentContianerPropsI>)
  | ({ kind: ComponentsKind.Note } & Partial<
      ComponentContianerPropsI & { noteId: string }
    >)
  | ({ kind: ComponentsKind.Options } & Partial<ComponentContianerPropsI>)
  | ({ kind: ComponentsKind.Link } & Partial<ComponentContianerPropsI> & {
        title: string;
        link: string;
      });

export const COMPONENT_INFO: ComponentsT[] = [
  {
    kind: ComponentsKind.Music,
    rowStart: 1,
    colStart: 1,
    rowSpan: 2,
    colSpan: 3,
  },
  {
    kind: ComponentsKind.General,
    rowStart: 3,
    colStart: 5,
    rowSpan: undefined,
    colSpan: undefined,
  },
  {
    kind: ComponentsKind.Note,
    rowSpan: 2,
    colSpan: 3,
    rowStart: 2,
    colStart: 10,
    noteId: "vhpa1",
  },
  {
    kind: ComponentsKind.Note,
    rowSpan: 2,
    colSpan: 3,
    rowStart: 5,
    colStart: 10,
    noteId: "05mrx",
  },
  {
    kind: ComponentsKind.Options,
  },
  {
    kind: ComponentsKind.Link,
    title: "Epic Games",
    link: "https://epicgames.com",
    rowStart: 4,
    colSpan: 2,
  },
  {
    kind: ComponentsKind.Link,
    title: "Torn",
    link: "https://torn.com",
    rowStart: 5,
    colStart: 1,
  },
  {
    kind: ComponentsKind.Link,
    title: "Reddit",
    link: "https://reddit.com",
    rowStart: 5,
    colStart: 2,
  },
  {
    kind: ComponentsKind.Link,
    title: "Steam",
    link: "https://store.steampowered.com",
    rowStart: 4,
    colStart: 3,
    rowSpan: 2,
  },
];
