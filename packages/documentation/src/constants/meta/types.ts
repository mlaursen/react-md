/**
 * This file was generated from @react-md/dev-utils and should not be updated
 * manually.
 */

/**
 * An anchor that can be used for a table of contents.
 */
export interface TOCAnchor {
  /**
   * This should be a string that can be used to link to another part of a page.
   * For example: `#this-is-a-title-id`
   */
  anchor: string;

  /**
   * The title for the anchor. Note: the `anchor` is normally generated from the
   * title's value.
   */
  title: string;
}

/**
 * The metadata for a demo on one of the package's demo pages.
 */
export interface DemoMetadata {
  /**
   * The title for the demo.
   */
  title: string;

  /**
   * The description for the demo. This is generated based on the demo's
   * markdown file that is normally provided for each demo as the `description`
   * field..
   */
  summary: string;
}

export type MetadataType =
  | "guide"
  | "theme"
  | "sassdoc"
  | "demos"
  | "demo"
  | "api"
  | "changelog";

/**
 * A record of all the table of content anchors based on pathname for quick
 * lookups.
 */
export type TOCRecord = Record<string, readonly TOCAnchor[] | undefined>;

/**
 * This is used for searching within the documentation site.
 */
export interface RouteMetadata {
  /**
   * The title of the "thing" that can be directly navigated to.
   */
  title: string;

  /**
   * A short summary describing what this "thing" is. This is normally generated
   * from related markdown files.
   */
  summary: string;

  /**
   * This is the url that should be used by nextjs since some of the pages are
   * dynamically generated with `[id]`s in the url.
   */
  pageUrl: string;

  /**
   * The pathname for this item. This is what will be displayed in the browser
   * url.
   */
  pathname: string;

  /**
   * The type of the metadata item.
   */
  type: MetadataType;
}

export interface IndexedResult {
  readonly tocs: TOCRecord;
  readonly metadata: readonly RouteMetadata[];
}
