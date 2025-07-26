import {
  type DataType,
  type ExampleType,
  type Item,
  type ItemDataType,
  type ItemExample,
  type ItemParameter,
  type ItemReturn,
  type ItemThrow,
} from "sassdoc";

export type * from "sassdoc";

/**
 * This is complete over-engineering since it's really just a string type, but I want
 * to know and be consistent for how the sassdoc types are defined.
 */
export type JoinedDataType =
  | "Map|String"
  | "List|Map"
  | "List|String"
  | "List|Map|String"
  | "Color|null"
  | "Color|String"
  | "Color|String|Number"
  | "String|Null"
  | "String|Number"
  | "any"
  | "String...";
export type SupportedVariableType = DataType | JoinedDataType;
export type SupportedItemDataType = ItemDataType | JoinedDataType;

export type SimplePrimative = boolean | number | string | null;
export type Primative = SimplePrimative | SimplePrimative[];
export type VariableValue =
  | SimplePrimative
  | SimplePrimative[]
  | ValuedVariable
  | ValuedVariable[];
export interface ValuedVariable {
  name: string;
  value: VariableValue;
}

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

  group: string;
}

export interface FullItemReferenceLink extends ItemReferenceLink {
  private: boolean;
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
   * This is the name exposed when referencing items with `@use
   * "@react-md/core"`.
   */
  name: string;

  /**
   * The original name within the current file.
   */
  originalName: string;

  /** The sassdoc group (folder) */
  group: string;
  private: boolean;
  description: string;

  /**
   * A github url pointing to the line(s) of the item.
   */
  source: string;

  /**
   * Any additional items that provide additional information or usage
   * for the item.
   */
  see?: readonly ItemReferenceLink[];

  /**
   * Any external links that provide context or information for the item.
   */
  links?: readonly FormattedItemLink[];

  /**
   * An optional list of items that use the current item. This isn't super
   * important info, but might help show additional use cases.
   */
  usedBy?: readonly ItemReferenceLink[];

  /**
   * An optional list of items that are required the current item. This isn't
   * super important info, but might help show additional use cases.
   */
  requires?: readonly ItemReferenceLink[];

  /**
   * A list of examples provided for the item. These will include a compiled
   * output as well to help show what the example does.
   */
  examples?: readonly CompiledExample[];

  /**
   * An optional version that the variable, mixin, or function was added.
   */
  since?: string;
}

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

  /**
   * This will only be `undefined` when the function or mixin has no parameters.
   */
  parameters?: readonly ParameterizedItemParameter[];
}

export type ParameterizedItemParameter = ItemParameter<SupportedItemDataType>;

export interface FormattedFunctionItem
  extends FormattedItem,
    ParameterizedItem {
  type: "function";
  returns: ItemReturn<SupportedItemDataType>;
}

export interface FormattedMixinItem extends FormattedItem, ParameterizedItem {
  type: "mixin";
}

export type FormattedSassDocItem =
  | FormattedVariableItem
  | FormattedFunctionItem
  | FormattedMixinItem;
