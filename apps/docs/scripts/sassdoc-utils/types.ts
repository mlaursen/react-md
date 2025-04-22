import { type FormattedVariableItem } from "sassdoc-generator/types";

export type GroupedFormattedVariableItem = ReadonlyMap<
  string,
  ReadonlyMap<string, FormattedVariableItem>
>;
