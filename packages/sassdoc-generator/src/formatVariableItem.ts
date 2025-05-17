import { type VariableItem } from "sassdoc";

import { assertValidVariableDataType } from "./assertions.js";
import { getCompiledVariableValue } from "./getCompiledVariableValue.js";
import { type FormattedItem, type FormattedVariableItem } from "./types.js";

function isCompileable(value: string): boolean {
  return /([a-z]\.)|\$|if\(/.test(value);
}

export async function formatVariableItem(
  src: string,
  baseItem: FormattedItem,
  item: VariableItem
): Promise<FormattedVariableItem> {
  const { type } = item;
  const { scope, value } = item.context;
  try {
    assertValidVariableDataType(type);
  } catch (e) {
    console.error(`${item.context.name} has an invalid type!`);
    throw e;
  }

  let compiled: string | undefined;
  if (isCompileable(value)) {
    compiled = await getCompiledVariableValue(src, item);
  }

  return {
    ...baseItem,
    value,
    type,
    overridable: scope === "default",
    compiled,
  };
}
