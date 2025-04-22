import { writeGeneratedFile } from "docs-generator/utils/writeGeneratedFile";
import { type GeneratedSassDocWithOrder } from "sassdoc-generator";
import { type FormattedSassDocItem } from "sassdoc-generator/types";

import { GENERATED_SASSDOC_FILE } from "../constants.js";
import { sort } from "./sort.js";

const stringify = (
  map: ReadonlyMap<string, FormattedSassDocItem>,
  order: ReadonlyMap<string, number>
): string => JSON.stringify(Object.fromEntries(sort(map, order)));

export async function createSassDocFile(
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

  await writeGeneratedFile({
    fileName: GENERATED_SASSDOC_FILE,
    contents: `
import { type FormattedMixinItem, type FormattedVariableItem, type FormattedFunctionItem } from "sassdoc-generator/types";

// adding \`| undefined\` since i don't have the \`noUncheckedIndexedAccess\`
// ts option enabled and causes invalid types when using \`||\`
export const SASSDOC_MIXINS: Record<string, FormattedMixinItem | undefined> = ${stringify(mixins, mixinsOrder)};
export const SASSDOC_FUNCTIONS: Record<string, FormattedFunctionItem | undefined> = ${stringify(functions, functionsOrder)};
export const SASSDOC_VARIABLES: Record<string, FormattedVariableItem | undefined> = ${stringify(variables, variablesOrder)};

`,
  });
}
