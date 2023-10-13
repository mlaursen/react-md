import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { GENERATED_FILE_BANNER } from "../constants.js";
import { printTypeUnion } from "./converters.js";
import { format } from "./format.js";
import { MaterialIconAndSymbolMetadata } from "./getMaterialMetadata.js";

export async function createCoreMetadataFIle(
  metadata: MaterialIconAndSymbolMetadata,
  projectRoot: string
): Promise<void> {
  const { iconNames, iconFamilyTypes, symbolNames, symbolFamilyTypes } =
    metadata;

  const generatedTypes = await format(
    `${GENERATED_FILE_BANNER}

/** @remarks \\@since 6.0.0 */
${printTypeUnion("MaterialIconFamily", iconFamilyTypes)}

/** @remarks \\@since 6.0.0 */
${printTypeUnion("MaterialIconName", [...iconNames])}

/** @remarks \\@since 6.0.0 */
${printTypeUnion("MaterialSymbolFamily", symbolFamilyTypes)}

/** @remarks \\@since 6.0.0 */
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
