import { type ReactNode } from "react";

export const LAYOUT_TYPES = [
  "temporary",
  "expandable",
  "full-height",
  "full-height-expandable",
  "resizable",
  "full-height-resizable",
  "tree",
] as const;
export type LayoutType = (typeof LAYOUT_TYPES)[number];

export interface ExampleLayoutProps {
  layout: LayoutType;
  children: ReactNode;
}
