import { getProjectRootDir } from "docs-generator/utils/getProjectRootDir";
import { join } from "node:path";

export const PROJECT_ROOT = getProjectRootDir();
export const CORE_ROOT = join(PROJECT_ROOT, "packages", "core");
export const CORE_SRC = join(CORE_ROOT, "src");
export const DOCS_ROOT = join(PROJECT_ROOT, "apps", "docs");
export const DOCS_SRC = join(DOCS_ROOT, "src");
export const GENERATED_DIR = join(DOCS_SRC, "generated");
export const GENERATED_SASSDOC_FILE = join(GENERATED_DIR, "sassdoc.ts");
export const GENERATED_SASSDOC_NAV_ITEMS_FILE = join(
  GENERATED_DIR,
  "sassdocNavItems.ts"
);

export const GENERATED_STACKBLITZ_FILE = join(GENERATED_DIR, "stackblitz.ts");
