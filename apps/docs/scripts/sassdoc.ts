import { getProjectRootDir } from "docs-generator/utils/getProjectRootDir";
import { log } from "docs-generator/utils/log";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { format } from "prettier";
import { type GeneratedSassDocWithOrder, generate } from "sassdoc-generator";
import { type FormattedSassDocItem } from "sassdoc-generator/types";

import { GENERATED_FILE_BANNER } from "./constants.js";

const PROJECT_ROOT = getProjectRootDir();
const CORE_SRC = join(PROJECT_ROOT, "packages", "core", "src");
const GENERATED_DIR = join(PROJECT_ROOT, "apps", "docs", "src", "generated");
const GENERATED_SASSDOC_FILE = join(GENERATED_DIR, "sassdoc.ts");
const ALIASED_SASSDOC_FILE = GENERATED_SASSDOC_FILE.replace(/^.+src\//, "@/");

function stringify(
  map: ReadonlyMap<string, FormattedSassDocItem>,
  order: ReadonlyMap<string, number>
): string {
  const entries = [...map.entries()];
  entries.sort(([a], [b]) => (order.get(a) ?? 0) - (order.get(b) ?? 0));

  return JSON.stringify(Object.fromEntries(entries));
}

async function createSassDocFile(
  generated: GeneratedSassDocWithOrder
): Promise<void> {
  const {
    mixins,
    functions,
    variables,
    mixinsOrder,
    variablesOrder,
    functionsOrder,
  } = generated;

  const contents = `${GENERATED_FILE_BANNER}

import { type FormattedMixinItem, type FormattedVariableItem, type FormattedFunctionItem } from "sassdoc-generator/types";

// adding \`| undefined\` since i don't have the \`noUncheckedIndexedAccess\`
// ts option enabled and causes invalid types when using \`||\`
export const SASSDOC_MIXINS: Record<string, FormattedMixinItem | undefined> = ${stringify(mixins, mixinsOrder)};
export const SASSDOC_FUNCTIONS: Record<string, FormattedFunctionItem | undefined> = ${stringify(functions, functionsOrder)};
export const SASSDOC_VARIABLES: Record<string, FormattedVariableItem | undefined> = ${stringify(variables, variablesOrder)};
`;

  await writeFile(
    GENERATED_SASSDOC_FILE,
    await format(contents, { parser: "typescript" })
  );
}

async function run(): Promise<void> {
  if (!existsSync(GENERATED_DIR)) {
    await mkdir(GENERATED_DIR, { recursive: true });
  }

  await createSassDocFile(await generate({ src: CORE_SRC }));
}

await log(run(), "", `Created ${ALIASED_SASSDOC_FILE}`);
