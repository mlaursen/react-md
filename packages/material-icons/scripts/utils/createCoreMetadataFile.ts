import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import { GENERATED_FILE_BANNER } from "../constants.js";
import { printTypeUnion } from "./converters.js";
import { format } from "./format.js";
import { type MaterialIconAndSymbolMetadata } from "./getMaterialMetadata.js";

export async function createCoreMetadataFIle(
  metadata: MaterialIconAndSymbolMetadata,
  projectRoot: string
): Promise<void> {
  const { iconNames, iconFamilyTypes, symbolNames, symbolFamilyTypes } =
    metadata;

  const generatedTypes = await format(
    `${GENERATED_FILE_BANNER}

/** @since 6.0.0 */
${printTypeUnion("MaterialIconFamily", iconFamilyTypes)}

/** @since 6.0.0 */
${printTypeUnion("MaterialIconName", [...iconNames])}

/** @since 6.0.0 */
${printTypeUnion("MaterialSymbolFamily", symbolFamilyTypes)}

/** @since 6.0.0 */
${printTypeUnion("MaterialSymbolName", [...symbolNames])}

`
  );

  const materialTypesPath = join(
    projectRoot,
    "packages",
    "core",
    "src",
    "icon",
    "material.ts"
  );
  await writeFile(materialTypesPath, generatedTypes, "utf8");
  console.log(`Wrote "${materialTypesPath}"`);
}
