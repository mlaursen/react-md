export interface TableOfContentsItem {
  id: string;
  depth: number;
  value: string;
  children?: TableOfContentsItem[];
}
