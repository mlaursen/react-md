import { join } from "path";

import { documentationRoot, src } from "./constants";
import format from "./utils/format";
import getPackages, {
  NO_STYLES_PACKAGES,
  NO_SCRIPT_PACKAGES,
} from "./utils/getPackages";
import writeFile from "./utils/writeFile";

export default async function docConstants(): Promise<void> {
  const constantsPath = join(
    documentationRoot,
    src,
    "constants",
    "packages.ts"
  );

  const contents = `
/** this file is generated from \`yarn dev-utils docConstants\` and should not be updated manually */

export const PACKAGE_NAMES = ${JSON.stringify(getPackages())};

export const TYPESCRIPT_PACKAGES = PACKAGE_NAMES.filter(
  name => !${NO_SCRIPT_PACKAGES}.test(name)
);

export const SCSS_PACKAGES = PACKAGE_NAMES.filter(
  name => !${NO_STYLES_PACKAGES}.test(name)
);

export const DEMOABLE_PACKAGES = PACKAGE_NAMES.filter(
  name => !/layout/.test(name)
);
`;

  await writeFile(constantsPath, format(contents, "typescript"));
}
