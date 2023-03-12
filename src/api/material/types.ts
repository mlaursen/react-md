import type { MaterialIconFamily } from "@react-md/core";

export interface IconMetadata {
  name: string;
  version: number;
  codepoint: number;
  unsupported_families: string[];
  categories: string[];
  tags: string[];
  sizes_px: number[];
}

export interface FontMetadata {
  host: string;
  asset_url_pattern: string;
  families: string[];
  icons: IconMetadata[];
}

export type MaterialIconType = "icon" | "symbol";
export type IconsByCategory = Record<string, readonly string[]>;
export type IconsByCategoryMap = Map<string, Set<string>>;
export type CategoriesByFamilyType = Record<string, IconsByCategory>;
export type CategoriesByFamilyTypeMap = Map<string, IconsByCategoryMap>;

export interface MaterialComponentMetadata {
  host: string;
  name: string;
  version: number;
  family: string;
  iconFamily: MaterialIconFamily;
}

export interface MaterialFamilyParts {
  iconType: MaterialIconType;
  iconFamily: MaterialIconFamily;
}

export interface MaterialIconAndSymbolMetadata {
  components: MaterialComponentMetadata[];
  iconNameFixes: Map<string, string>;
  iconNames: Set<string>;
  iconsLookup: CategoriesByFamilyType;
  iconCategories: readonly string[];
  iconFamilyTypes: readonly string[];
  symbolNames: Set<string>;
  symbolsLookup: CategoriesByFamilyType;
  symbolCategories: readonly string[];
  symbolFamilyTypes: readonly string[];
}

export interface GeneratingStats {
  endTime?: number;
  startTime?: number;
  total: number;
  completed: number;
  remaining: number;
}
