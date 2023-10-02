export interface TableOfContentsItem {
  id: string;
  depth: number;
  value: string;
  items?: readonly TableOfContentsItem[];
}
