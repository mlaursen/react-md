/**
 * This file was generated from @react-md/dev-utils and should not be updated
 * manually.
 */

export interface TOCAnchor {
  anchor: string;
  title: string;
}

export interface DemoMetadata {
  title: string;
  summary: string;
}

export interface RouteAnchors {
  pathname: string;
  anchors: readonly TOCAnchor[];
}

export type RouteType =
  | "guide"
  | "theme"
  | "sassdoc"
  | "demos"
  | "demo"
  | "api";

export type TOCRecord = Record<string, readonly TOCAnchor[] | undefined>;

export interface RouteMetadata {
  title: string;
  summary: string;
  asPath: string;
  pathname: string;
  type: RouteType;
}

export interface IndexedResult {
  readonly tocs: TOCRecord;
  readonly metadata: readonly RouteMetadata[];
}
