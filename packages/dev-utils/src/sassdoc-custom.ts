import {
  DataType,
  ExampleType,
  Item,
  ItemExample,
  ItemThrow,
  ItemParameter,
  ItemDataType,
  ItemReturn,
  VariableItem,
  PlaceholderItem,
  FunctionItem,
  MixinItem,
} from "sassdoc";

export * from "sassdoc";

export const isVariableItem = (item: Item): item is VariableItem =>
  item.context.type === "variable";

export const isPlaceholderItem = (item: Item): item is PlaceholderItem =>
  item.context.type === "placeholder";

export const isFunctionItem = (item: Item): item is FunctionItem =>
  item.context.type === "function";

export const isMixinItem = (item: Item): item is MixinItem =>
  item.context.type === "mixin";

export const isPublic = (item: Item): boolean => item.access !== "private";

export interface CompiledExample extends ItemExample<ExampleType | "html"> {
  /**
   * A compiled version if the code is an scss example.
   */
  compiled?: string;
}

/**
 * This is used to create quick links between each package's sassdoc or
 * link within the same sassdoc page if looking at the entire react-md's
 * sassdoc at once.
 */
export interface ItemReferenceLink {
  /**
   * The name of the referenced item.
   */
  name: string;

  /**
   * The type of the referenced item. This should be one of:
   * - function
   * - mixin
   * - variable
   */
  type: Item["context"]["type"];

  /**
   * The package name the item exists in.
   */
  packageName: string;
}

/**
 * I don't like the url and caption in the default item link so I map it
 * into this shape instead. Same length keys ftw.
 */
export interface FormattedItemLink {
  name: string;
  href: string;
}

export interface FormattedItem {
  /**
   * The name for the item.
   */
  name: string;

  /**
   * The description for the item.
   */
  description: string;

  /**
   * A github url pointing to the line(s) of the item.
   */
  source: string;

  /**
   * The package that the item is in. This will not be prefixed
   * with @react-md.
   */
  packageName: string;

  /**
   * Any additional items that provide additional information or usage
   * for the item.
   */
  see?: ItemReferenceLink[];

  /**
   * Any external links that provide context or information for the item.
   */
  links?: FormattedItemLink[];

  /**
   * An optional list of items that use the current item. This isn't super
   * important info, but might help show additional use cases.
   */
  usedBy?: ItemReferenceLink[];

  /**
   * A list of examples provided for the item. These will include a compiled
   * output as well to help show what the example does.
   */
  examples?: CompiledExample[];
}

/**
 * This is complete over-engineering since it's really just a string type, but I want
 * to know and be consistent for how the sassdoc types are defined.
 */
export type JoinedDataType =
  | "Map|String"
  | "List|String"
  | "Color|String"
  | "Color|String|Number"
  | "String|Number"
  | "String...";
export type SupportedVariableType = DataType | JoinedDataType;
export type SupportedItemDataType = ItemDataType | JoinedDataType;

export interface FormattedVariableItem extends FormattedItem {
  /**
   * The variable's type.
   */
  type: SupportedVariableType;

  /**
   * The value for the variable.
   */
  value: string;

  /**
   * A default compiled value if the value is dynamic and has a different compiled value.
   * This will be determined if the value contains any variables or an `if` statement.
   */
  compiled?: string;

  /**
   * Boolean if the variable can be overridden in the main scss bundle. This should
   * be true for most variables within react-md.
   */
  overridable: boolean;
}

export interface ParameterizedItem {
  /**
   * A single line of code for the function or mixin.
   */
  code: string;

  /**
   * The full source code for the function. This is used to dynamically expand to
   * show the full source as needed.
   */
  sourceCode: string;

  /**
   * An optional list of errors that can be thrown by the function or mixin.
   */
  throws?: ItemThrow;
}

export type ParameterizedItemParameter = ItemParameter<SupportedItemDataType>;

export interface FormattedFunctionItem
  extends FormattedItem,
    ParameterizedItem {
  type: "function";
  parameters: ParameterizedItemParameter[];
  returns: ItemReturn<SupportedItemDataType>;
}

export interface FormattedMixinItem extends FormattedItem, ParameterizedItem {
  type: "mixin";

  /**
   * This will only be `undefined` when the mixin has no parameters.
   */
  parameters?: ParameterizedItemParameter[];
}

export type FormattedVariableItemRecord = Record<string, FormattedVariableItem>;
export type FormattedFunctionItemRecord = Record<string, FormattedFunctionItem>;
export type FormattedMixinItemRecord = Record<string, FormattedMixinItem>;

export interface PackageSassDoc {
  functions: FormattedFunctionItemRecord;
  mixins: FormattedMixinItemRecord;
  variables: FormattedVariableItemRecord;
}

export type PackageSassDocMap = Record<string, PackageSassDoc | undefined>;
