import { join } from "node:path";

export const GENERATED_FILE_BANNER =
  "// THIS FILE WAS GENERATED BY A SCRIPT AND SHOULD NOT BE UPDATED MANUALLY";

export const MATERIAL_ICONS_REPO =
  "https://github.com/google/material-design-icons";

// export const MATERIAL_ICONS_VERSION = "4.0.0";
export const MATERIAL_ICONS_VERSION = "master";

export const MATERIAL_ICONS_FOLDER = join(
  process.cwd(),
  "..",
  "material-design-icons"
);
export const MATERIAL_SYMBOLS_FOLDER = join(
  process.cwd(),
  "..",
  "material-design-symbols"
);

export const PACKAGES_ROOT = join(process.cwd(), "packages");
