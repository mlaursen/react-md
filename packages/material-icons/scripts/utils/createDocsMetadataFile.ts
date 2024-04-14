import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { GENERATED_FILE_BANNER } from "../constants.js";
import { printConst, printTypeUnion } from "./converters.js";
import { format } from "./format.js";
import { type MaterialIconAndSymbolMetadata } from "./getMaterialMetadata.js";

export async function createDocsMetadataFile(
  metadata: MaterialIconAndSymbolMetadata,
  projectRoot: string
): Promise<void> {
  const {
    iconsLookup,
    iconFamilyTypes,
    iconCategories,
    symbolsLookup,
    symbolFamilyTypes,
    symbolCategories,
    iconNameFixes,
  } = metadata;

  const docsMetadataFileName = join(
    projectRoot,
    "apps",
    "docs",
    "src",
    "app",
    "components",
    "material-icons-and-symbols",
    "metadata.ts"
  );

  const generatedMetadata = await format(
    `${GENERATED_FILE_BANNER}

import {
  type MaterialIconName,
  type MaterialSymbolName,
} from "@react-md/core/icon/material";

export type MaterialIconType = "icon" | "symbol";
export type MaterialIconAndSymbolName = MaterialIconName | MaterialSymbolName;
export type IconsByCategory = Record<string, readonly MaterialIconAndSymbolName[]>;
export type CategoriesByFamilyType = Record<string, IconsByCategory>;

${printConst(
  "ICON_NAME_FIXES",
  Object.fromEntries(iconNameFixes),
  "Record<string, string>"
)}

${printConst("MATERIAL_ICONS", iconsLookup, "CategoriesByFamilyType")}
${printConst("MATERIAL_ICON_FAMILY_TYPES", iconFamilyTypes)}
${printConst("MATERIAL_ICON_CATEGORIES", iconCategories)}
${printTypeUnion("MaterialIconCategory", iconCategories)}

${printConst("MATERIAL_SYMBOLS", symbolsLookup, "CategoriesByFamilyType")}
${printConst("MATERIAL_SYMBOL_FAMILY_TYPES", symbolFamilyTypes)}
${printConst("MATERIAL_SYMBOL_CATEGORIES", symbolCategories)}
${printTypeUnion("MaterialSymbolCategory", symbolCategories)}

`
  );
  await writeFile(docsMetadataFileName, generatedMetadata, "utf8");
  console.log(`Wrote "${docsMetadataFileName}"`);
}
