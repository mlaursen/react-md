import { log } from "docs-generator/utils/log";
import { writeFile } from "node:fs/promises";
import { format } from "prettier";
import { type GeneratedSassDocWithOrder, generate } from "sassdoc-generator";
import { type FormattedSassDocItem } from "sassdoc-generator/types";

import {
  ALIASED_SASSDOC_FILE,
  CORE_SRC,
  GENERATED_FILE_BANNER,
  GENERATED_SASSDOC_FILE,
} from "./constants.js";
import { ensureGeneratedDir } from "./ensureGeneratedDir.js";

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
  await ensureGeneratedDir();
  await createSassDocFile(await generate({ src: CORE_SRC }));
}

await log(run(), "", `Created ${ALIASED_SASSDOC_FILE}`);
