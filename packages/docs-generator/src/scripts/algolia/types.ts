export interface HeadingWithDescription {
  id: string;
  depth: number;
  title: string;
  description: string;
}

export interface IndexedPage {
  objectID: string;
  url: string;
  pathname: string;
  type: "page";
  title: string;
  description: string;
  headings: readonly HeadingWithDescription[];
  alias?: readonly string[];
  hooks?: readonly string[];
  components?: readonly string[];
  docType?: string;
  docGroup?: string;
  group?: string;
  keywords: readonly string[];
}

export interface IndexedSassDoc {
  objectID: string;
  url: string;
  pathname: string;
  type: "sassdoc";
  name: string;
  group: string;
  itemType: "variable" | "function" | "mixin";
  description: string;
}

export type IndexedItem = IndexedPage | IndexedSassDoc;
