import { type MaterialIconFamily } from "@react-md/core";

export interface MaterialComponentMetadata {
  host: string;
  name: string;
  version: number;
  family: string;
  iconFamily: MaterialIconFamily;
}

export type MaterialIconType = "icon" | "symbol";
export type IconsByCategory = Record<string, readonly string[]>;
export type IconsByCategoryMap = Map<string, Set<string>>;
export type CategoriesByFamilyType = Record<string, IconsByCategory>;
export type CategoriesByFamilyTypeMap = Map<string, IconsByCategoryMap>;

export function printConst(
  name: string,
  value: unknown,
  type?: string
): string {
  const t = type ? `: ${type}` : "";
  const cast = type ? "" : " as const";

  return `export const ${name}${t} = ${JSON.stringify(value)}${cast}`;
}

export function printTypeUnion(
  name: string,
  values: readonly string[]
): string {
  const union = values.map((value) => `| "${value}"`).join("");

  return `export type ${name} = ${union}`;
}

export function categoriesMapToObject(
  categories: CategoriesByFamilyTypeMap
): CategoriesByFamilyType {
  const lookup: Record<string, Record<string, string[]>> = {};
  categories.forEach((categoryLookup, familyType) => {
    lookup[familyType] = {};
    categoryLookup.forEach((iconNames, category) => {
      lookup[familyType][category] = [...iconNames];
    });
  });

  return lookup;
}

export function getSortedCategories(
  lookup: CategoriesByFamilyTypeMap
): readonly string[] {
  const categories = new Set<string>();
  lookup.forEach((value) => {
    value.forEach((_value, category) => {
      categories.add(category);
    });
  });

  const sorted = [...categories].sort();
  return sorted;
}
