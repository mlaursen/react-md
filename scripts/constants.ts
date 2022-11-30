import { join } from "node:path";

export const COPY_BANNER =
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

export const MATERIAL_ICONS_SPARSE_CHECKOUT = `cat > .git/info/sparse-checkout << EOF
/src/
!/src/**/20px.svg
EOF
`;

export const PACKAGES_ROOT = join(process.cwd(), "packages");
