import { format } from "prettier";
import { type FunctionItem, type MixinItem } from "sassdoc";

import { formatDescription } from "./formatDescription.js";
import {
  type FormattedFunctionItem,
  type FormattedItem,
  type FormattedMixinItem,
  type ParameterizedItem,
} from "./types.js";

async function formatParameterizedItem(
  item: MixinItem | FunctionItem
): Promise<ParameterizedItem> {
  const {
    parameter,
    context: { code: rawCode, name, type },
    throw: throws,
  } = item;

  let params = "";
  if (parameter) {
    params = parameter
      .map((param) => {
        const { name } = param;
        const defaultValue = (param.default || "").replace(/^rmd/, "$rmd");
        const suffix = defaultValue && `: ${defaultValue}`;

        return `$${name}${suffix}`;
      })
      .join(", ");

    params = `(${params})`;
  }

  const sourceCode = `@${type} ${name}${params} {${rawCode}}`;
  const prefix = sourceCode.substring(0, sourceCode.indexOf("{") + 1);
  const suffix = sourceCode.substring(sourceCode.lastIndexOf("}"));
  const code = `${prefix} \u2026 ${suffix}`;

  return {
    code,
    sourceCode: await format(sourceCode, { parser: "scss" }),
    parameters: parameter?.map(({ description, ...param }) => ({
      ...param,
      description: formatDescription(description),
    })),
    throws,
  };
}

export async function formatFunctionItem(
  baseItem: FormattedItem,
  item: FunctionItem
): Promise<FormattedFunctionItem> {
  if (!item.return) {
    throw new Error(`${baseItem.name} is missing the @return annotation`);
  }

  return {
    ...baseItem,
    type: "function",
    returns: item.return,
    ...(await formatParameterizedItem(item)),
  };
}

export async function formatMixinItem(
  baseItem: FormattedItem,
  item: MixinItem
): Promise<FormattedMixinItem> {
  return {
    ...baseItem,
    type: "mixin",
    ...(await formatParameterizedItem(item)),
  };
}
