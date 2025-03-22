import { getProjectRootDir } from "docs-generator/utils/getProjectRootDir";
import { log, logComplete } from "docs-generator/utils/log";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { format } from "prettier";
import { type GeneratedSassDoc, generate } from "sassdoc-generator";

import { GENERATED_FILE_BANNER } from "./constants.js";

const PROJECT_ROOT = getProjectRootDir();
const CORE_SRC = join(PROJECT_ROOT, "packages", "core", "src");
const GENERATED_DIR = join(PROJECT_ROOT, "apps", "docs", "src", "generated");
const GENERATED_SASSDOC_FILE = join(GENERATED_DIR, "sassdoc.ts");
const ALIASED_SASSDOC_FILE = GENERATED_SASSDOC_FILE.replace(/^.+src\//, "@/");

async function createSassDocFile(generated: GeneratedSassDoc): Promise<void> {
  const { mixins, functions, variables } = generated;

  const contents = `${GENERATED_FILE_BANNER}

import { type FormattedMixinItem, type FormattedVariableItem, type FormattedFunctionItem } from "sassdoc-generator/types";

// adding \`| undefined\` since i don't have the \`noUncheckedIndexedAccess\`
// ts option enabled and causes invalid types when using \`||\`
export const SASSDOC_MIXINS: Record<string, FormattedMixinItem | undefined> = ${JSON.stringify(Object.fromEntries(mixins.entries()))};
export const SASSDOC_FUNCTIONS: Record<string, FormattedFunctionItem | undefined> = ${JSON.stringify(Object.fromEntries(functions.entries()))};
export const SASSDOC_VARIABLES: Record<string, FormattedVariableItem | undefined> = ${JSON.stringify(Object.fromEntries(variables.entries()))};
`;

  await writeFile(
    GENERATED_SASSDOC_FILE,
    await format(contents, { parser: "typescript" })
  );
}

if (process.argv.includes("--touch")) {
  if (existsSync(GENERATED_SASSDOC_FILE)) {
    logComplete(
      `Skipped generting ${ALIASED_SASSDOC_FILE} since it already exists`
    );
  } else {
    if (!existsSync(GENERATED_DIR)) {
      await mkdir(GENERATED_DIR, { recursive: true });
    }

    await log(
      createSassDocFile({
        mixins: new Map(),
        functions: new Map(),
        variables: new Map(),
      }),
      "",
      `Created an empty ${ALIASED_SASSDOC_FILE}`
    );
  }

  process.exit(0);
}

async function run(): Promise<void> {
  await createSassDocFile(await generate({ src: CORE_SRC }));
}

await log(run(), "", `Created ${ALIASED_SASSDOC_FILE}`);
