import {
  CategoriesByFamilyType,
  CategoriesByFamilyTypeMap,
  MaterialComponentMetadata,
  categoriesMapToObject,
  getSortedCategories,
} from "./converters.js";
import { getGoogleFontsMetadata } from "./getGoogleFontsMetadata.js";
import { getMaterialFamilyParts } from "./getMaterialFamilyParts.js";

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

export async function getMaterialMetadata(): Promise<MaterialIconAndSymbolMetadata> {
  const { host, families, icons } = await getGoogleFontsMetadata();
  const iconNames = new Set<string>();
  const symbolNames = new Set<string>();
  const iconsByFamilyType: CategoriesByFamilyTypeMap = new Map();
  const symbolsByFamilyType: CategoriesByFamilyTypeMap = new Map();
  const iconNameFixes = new Map<string, string>();
  const components: MaterialComponentMetadata[] = [];
  icons.forEach((metadata) => {
    const { name, unsupported_families, categories, sizes_px, version } =
      metadata;
    if (categories.length !== 1) {
      throw new Error(`${name} does not have exactly 1 category`);
    }
    if (!sizes_px.includes(24)) {
      throw new Error(`${name} does not support 24px size`);
    }

    const category = categories[0].toLowerCase();
    families.forEach((family) => {
      if (unsupported_families.includes(family)) {
        return;
      }
      const { iconType, iconFamily } = getMaterialFamilyParts(family);

      const names = iconType === "icon" ? iconNames : symbolNames;
      names.add(name);

      const lookup =
        iconType === "icon" ? iconsByFamilyType : symbolsByFamilyType;
      const iconsLookup = lookup.get(iconFamily) || new Map();
      const iconsSet = iconsLookup.get(category) || new Set();

      if (iconType === "icon") {
        if (/^[0-9]/.test(name)) {
          iconNameFixes.set(name, `${category}_${name}`);
        } else if (name === "addchart") {
          iconNameFixes.set(name, "add_chart_alt");
        } else if (name.endsWith("_outlined")) {
          // there are conflicts with outlines
          iconNameFixes.set(name, name.replace("_outlined", "_bordered"));
        }
      }

      iconsSet.add(name);
      iconsLookup.set(category, iconsSet);
      lookup.set(iconFamily, iconsLookup);
      if (iconType === "icon") {
        components.push({
          host,
          name,
          version,
          family,
          iconFamily,
        });
      }
    });
  });

  const symbolsLookup = categoriesMapToObject(symbolsByFamilyType);
  const symbolFamilyTypes = Object.keys(symbolsLookup);
  const symbolCategories = getSortedCategories(symbolsByFamilyType);
  const iconsLookup = categoriesMapToObject(iconsByFamilyType);
  const iconFamilyTypes = Object.keys(iconsLookup);
  // make it so family types that exist in symbols appear first and can be reused
  iconFamilyTypes.sort((a, b) =>
    symbolFamilyTypes.includes(a) && !symbolFamilyTypes.includes(b) ? -1 : 1
  );

  const iconCategories = getSortedCategories(iconsByFamilyType);

  return {
    components,
    iconNameFixes,
    iconNames,
    iconsLookup,
    iconCategories,
    iconFamilyTypes,
    symbolNames,
    symbolsLookup,
    symbolCategories,
    symbolFamilyTypes,
  };
}
