import { MaterialIconFamily } from "@react-md/core";
import lodash from "lodash";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { GENERATED_FILE_BANNER } from "../constants.js";
import { MaterialComponentMetadata } from "./converters.js";
import { format } from "./format.js";
import { getSvgIconChildren } from "./svg.js";

function pascalCase(s: string): string {
  return lodash.upperFirst(lodash.camelCase(s));
}

interface GetMaterialIconComponentNameOptions {
  name: string;
  iconFamily: MaterialIconFamily;
  iconNameFixes: Map<string, string>;
}

function getMaterialIconComponentName(
  options: GetMaterialIconComponentNameOptions
): string {
  const { name, iconFamily, iconNameFixes } = options;

  const iconName = iconNameFixes.get(name) || name;
  const suffix = `${iconFamily === "filled" ? "" : `_${iconFamily}`}_icon`;

  return pascalCase(`${iconName}${suffix}`);
}

interface CreateIconComponentOptions extends MaterialComponentMetadata {
  created: Set<string>;
  iconNameFixes: Map<string, string>;
  materialIconsSrc: string;
}

export async function createIconComponent(
  options: CreateIconComponentOptions
): Promise<void> {
  const { created, materialIconsSrc, iconNameFixes, ...metadata } = options;
  const componentName = getMaterialIconComponentName(options);
  const fileName = `${componentName}.tsx`;
  if (created.has(fileName)) {
    console.error(`${fileName} has already been created!`);
    console.error(JSON.stringify(metadata, null, 2));
    process.exit(1);
  }

  const children = await getSvgIconChildren(options);
  const contents = await format(
    `${GENERATED_FILE_BANNER}

import { forwardRef } from "react";
import { SVGIcon, type SVGIconProps } from "@react-md/core/icon/SVGIcon"

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function ${componentName}(props, ref) {
    return <SVGIcon {...props} ref={ref}>${children}</SVGIcon>;
  }
);
`
  );

  if (created.has(fileName)) {
    console.error(`${fileName} has already been created!`);
    console.error(JSON.stringify(metadata, null, 2));
    process.exit(1);
  }

  created.add(fileName);
  await writeFile(join(materialIconsSrc, fileName), contents, "utf8");
}
