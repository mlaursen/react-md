import { DataType, ItemExample, ItemLink, ItemReference } from "sassdoc";

export * from "sassdoc";

export type FormattedItemType = "mixin" | "function" | "placeholder" | DataType;

export interface CompiledExample extends ItemExample {
  compiled: string;
}

export interface FormattedItem {
  name: string;
  type: FormattedItemType;
  description: string;
  source: string;
  group: string;
  see?: ItemReference[];
  usedBy?: ItemReference[];
  links?: ItemLink[];
  examples?: CompiledExample[];
}

export interface FormattedVariableItem extends FormattedItem {
  value: string;
  compiled?: string;
  overridable: boolean;
}
