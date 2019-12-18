/** this is a generated file from `yarn dev-utils sassdoc` and should not be manually updated */
/**
 * The `@access` annotation. Defaults to "public".
 *
 * ```scss
 * @access public
 * ```
 */
export type ItemAccess = "public" | "private";

/**
 * The types that can be annotated with sassdoc. These are built-in to
 * sassdoc and are case-sensitive.
 */
export type SassDocItemType = "function" | "mixin" | "placeholder" | "variable";

/**
 * The name for a specific item. Only used for documentation purposes
 */
export type ItemName = string;

/**
 * The recommended item types to use when using the `@param` and `@type`
 * annotations.
 *
 * ```scss
 * @param {Color} name - Description
 * @prop {Function} base.default [default] - Description
 * @type {String|Number}
 * ```
 */
export type DataType =
  | "Number"
  | "Boolean"
  | "Color"
  | "String"
  | "List"
  | "Map";

/**
 * The recommended item types to use when using the `@param`, `@prop` and
 * `@type` annotations.
 *
 * ```
 * @param {Color} name - Description
 * @prop {Function} base.default [default] - Description
 * @type {String|Number}
 * ```
 */
export type ItemDataType = DataType | "Function" | "Mixin";

/**
 * The `@author` annotation.
 *
 * ```scss
 * @author Mikkel Laursen
 * ```
 */
export type ItemAuthor = string[];

/**
 * The `@content` annotation. This will automatically be generated as an
 * empty string if the mixin uses the `@content` declaration.
 *
 * ```scss
 * @content Description about the `@content` declaration.
 * ```
 */
export type ItemContent = string;

/**
 * The `@deprecated` annotation.
 *
 * ```scss
 * @deprecated No longer in use because XY and Z.
 * ```
 */
export type ItemDeprecated = string;

/**
 * The supported example types for an `@example`.
 *
 * @see http://sassdoc.com/annotations/#example
 */
export type ExampleType = "css" | "scss" | "markup" | "javascript";

/**
 * The `@example` annotation. sassdoc only supports a few languages, but the
 * sassdoc interface can still use undocumented types.
 *
 * ```scss
 * @example scss - My Cool example
 *   .class-name {
 *     color: red;
 *   }
 * ```
 *
 * Note: Need to indent each line with two spaces
 */
export interface ItemExample<T extends string = ExampleType> {
  /**
   * The example's code.
   */
  code: string;

  /**
   * The example language type. This will default to "markup".
   */
  type: T;

  /**
   * This is really what I consider a "title" for the example. It's
   * everything after the hyphen.
   */
  description: string;
}

/**
 * The `@group` annotation.
 *
 * ```scss
 * @group Theme
 * ```
 *
 * Note: sassdoc does not support multiple groups out of the box so it'll
 * always be a list of a single item.
 */
export type ItemGroups = string[];

/**
 * The `@ignore` annotation. This is honestly worthless to add since it looks
 * like it'll always be an empty array.
 *
 * ```scss
 * @ignore This line will be ignored...
 * ```
 */
export type ItemIgnore = string[];

/**
 * The `@link` annotation.
 *
 * ```scss
 * @link https://example.com Caption for the link
 * ```
 */
export interface ItemLink {
  /**
   * The link's url.
   */
  url: string;

  /**
   * Any additional information with the link.
   */
  caption: string;
}

/**
 * The `@output` annotation.
 *
 * ```scss
 * @output Description of the output styles.
 * ```
 */
export type ItemOutput = string;

/**
 * The `@param` annotation.
 *
 * ```scss
 * @param {String} variable-name - My description
 * @param {Boolean} my-bool [false] - Another description
 * ```
 *
 * @typeparam T This can be used if you want to strongly type what types you
 * want to use in your sassdoc (normally for case-sensitivity). sassdoc is not
 * type sensitive and any type can really be added here. You can also use
 * pipes (`|`) to support multiple types.
 */
export interface ItemParameter<T extends string = ItemDataType> {
  /**
   * The name for the parameter.
   */
  name: string;

  /**
   * The type for the parameter. This can be a piped (`|`) value if multiple
   * types are supported.
   */
  type: T;

  /**
   * The description provided for the parameter.
   */
  description: string;

  /**
   * The default value (if one was set) for the parameter.
   */
  default?: string;
}

// aliases
export type ItemParam = ItemParameter;
export type ItemArg = ItemParameter;
export type ItemArgument = ItemParameter;

/**
 * The `@prop` annotation. This should only be used for Map types I believe.
 *
 * ```scss
 * @prop {Function} base.default [default] - description
 * ```
 */
export interface ItemProperty<T extends string = ItemDataType> {
  /**
   * The full path for the property on the map. So `base.default` in the
   * example above.
   */
  path: string;

  /**
   * The type for the property. This can be a piped (`|`) value if multiple
   * types are supported.
   */
  type: T;

  /**
   * The description provided for the property.
   */
  description: string;

  /**
   * The default value (if one was set) for the property.
   */
  default?: string;
}

// aliases
export type ItemProp = ItemProperty;

/**
 * The `@require` annotation. This probably shouldn't be used too much
 * manually since sassdoc automatically determines which items are required in
 * other items.
 *
 * ```scss
 * @require {type} item - description <link>
 * ```
 */
export interface ItemRequire {
  /**
   * The required item's name.
   */
  name: ItemName;

  /**
   * The required item's type. This should **not** be the data type.
   */
  type: SassDocItemType;

  /**
   * The description for the required item.
   */
  description: string;

  /**
   * This will only be defined when manually using the `@require` annotation.
   */
  url?: string;
}

// aliases
export type ItemRequires = ItemRequire;

/**
 * The `@return` annotation.
 *
 * ```scss
 * @return {Boolean} description
 * ```
 */
export interface ItemReturn<T extends string = ItemDataType> {
  /**
   * The type for the return value. This can be a piped (`|`) value if
   * multiple types are supported.
   */
  type: T;

  /**
   * The description for the return value.
   */
  description: string;
}

// aliases
export type ItemReturns = ItemReturn;

/**
 * The `@since` annotation.
 *
 * ```scss
 * @since version description
 * ```
 */
export interface ItemSince {
  /**
   * The version number.
   */
  version: string;

  /**
   * The description for the version.
   */
  description: string;
}

/**
 * The `@throw` annotation
 *
 * ```scss
 * @throw Error related message
 * ```
 */
export type ItemThrow = string[];

// aliases
export type ItemThrows = ItemThrow;
export type ItemException = ItemThrow;

/**
 * The `@todo` annotation
 *
 * ```scss
 * @todo Task to be done
 * ```
 */
export type ItemTodo = string[];

/**
 * The `@type` annotation. This can be a pipe-delimited list of types, but
 * they are not supported out of the box to keep things strict. You can
 * provide your own type value that extends the ItemDataType if you want it to
 * be strict or just do `string`.
 *
 * ```ts
 * export type MyItemType = ItemType<ItemDataType | string>;
 * ```
 *
 * ```scss
 * @type Boolean @type String | Color
 * ```
 */
export type ItemType<T extends string = ItemDataType> = T;

export interface LineNumberRange {
  start: number;
  end: number;
}

export interface BaseContext {
  /**
   * The name for the item.
   */
  name: ItemName;

  /**
   * The line that the item or sassdoc comments start.
   */
  line: LineNumberRange;
}

export interface CodeableContext extends BaseContext {
  /**
   * The code for a function or mixin.
   */
  code: string;
}

export interface ValueableContext extends BaseContext {
  /**
   * The value for a variable or placeholder.
   */
  value: string;
}

/**
 * This is used to tell if a variable can be overridden or if it is private
 * for the file. This will always be "private" unless the variable has
 * `!default` at the end.
 */
export type VariableScope = "default" | "private";

export interface VariableContext extends ValueableContext {
  type: "variable";
  scope: VariableScope;
}

export interface PlaceholderContext extends ValueableContext {
  type: "placeholder";
}

export interface MixinContext extends CodeableContext {
  type: "mixin";
}

export interface FunctionContext extends CodeableContext {
  type: "function";
}

export type ItemContext =
  | VariableContext
  | PlaceholderContext
  | MixinContext
  | FunctionContext;

/**
 * The `@see` annotation
 *
 * ```scss
 * @see other-type @see other-type Description
 * ```
 */
export interface ItemReference {
  context: ItemContext;

  /**
   * An optional description for the referenced item. This will be
   * auto-generated from the referenced item's description if it has one and
   * the description was omitted.
   */
  description?: string;
}

export interface SassFile {
  /**
   * The path to the file from the current working directory for the sassdoc
   * input path.
   *
   * ```sh
   * styles
   * └── src
   * ├── _functions.scss
   * ├── _mixins.scss
   * └── _variables.scss
   * ```
   *
   * ```ts
   * parse("styles");
   * // "src/_functions.scss"
   * // "src/_mixins.scss"
   * // "src/_variables.scss"
   * ```
   */
  path: string;

  /**
   * Only the file name without the leading directories.
   */
  name: string;
}

export interface BaseItem {
  /**
   * The access level for the item.
   */
  access: ItemAccess;

  /**
   * The groups that are associated with this item. This is normally a list
   * with a single group. The group will be defaulted to "undefined", but it's
   * inherited at a file level.
   */
  group: ItemGroups;

  /**
   * The description for the item.
   */
  description: string;

  /**
   * The file comment range for the item.
   */
  commentRange: LineNumberRange;

  /**
   * The file path and name for the item.
   */
  file: SassFile;

  /**
   * An optional list of authors for the item.
   */
  author?: ItemAuthor;

  /**
   * An optional list of items that should be referenced since they are
   * related to the item.
   */
  see?: ItemReference[];

  /**
   * An optional list of website links to also look at for the item.
   */
  link?: ItemLink[];

  /**
   * An optional list of examples related to the item.
   */
  example?: ItemExample[];

  /**
   * An optional list of items that are required for this to work. This is
   * actually available on variables and placeholders as well, but only
   * auto-generated on mixins and functions.
   */
  require?: ItemRequire[];

  /**
   * An optional list of items that uses this item. This is auto-generated
   * for functions and mixins.
   */
  usedBy?: ItemReference[];

  /**
   * An optional list of errors that are thrown by the item. This is actually
   * available on variables and placeholders as well, but only auto-generated
   * on mixins and functions,
   */
  throw?: ItemThrow;
}

/**
 * The declaration for a variable item.
 *
 * Note that sassdoc does zero validation on the `@type` and `@prop`
 * annotations so these data types so it might be incorrect. This is just set
 * to some "recommended" capitalized versions that should be used when
 * documenting.
 *
 * @typeparam T the data type for the `@type` annotation.  @typeparam IT The
 * data type for each item `@prop` annotation.
 */
export interface VariableItem<
  T extends string = DataType,
  IT extends string = ItemDataType
> extends BaseItem {
  context: VariableContext;

  /**
   * This will only be provided if the variable is using the `@type`
   * annotation.  It will be set to whatever value is set (with no
   * validation).
   */
  type?: T;

  /**
   * This will only be added if the variable is a Map type and the `@prop`
   * annotation is used.
   */
  property?: ItemProperty<IT>[];
}

/**
 * I don't use placeholders and they are "deprecated", so this probably isn't
 * 100% correct.
 */
export interface PlaceholderItem extends BaseItem {
  type: "placeholder";
  context: PlaceholderContext;
}

/**
 * See the referenced types for more info.
 *
 * Note: The `return` and `parameter` attributes _are_ actually optional and
 * will only be defined if the `@return` an `@param` annotations are used.
 * However they should be defined if writing "good" documentation, so I
 * set them to required.
 */
export interface FunctionItem<T extends string = ItemDataType>
  extends BaseItem {
  context: FunctionContext;
  return: ItemReturn<T>;
  parameter: ItemParameter<T>[];
}

/**
 * See the referenced types for more info.
 */
export interface MixinItem<T extends string = ItemDataType> extends BaseItem {
  context: MixinContext;
  content?: ItemContent;

  /**
   * This will be undefined when the `@param` annotation isn't used. So with
   * "good" documentation, it should only be undefined if a mixin has no
   * parameters.
   */
  parameter?: ItemParameter<T>[];
}

export type Item<T extends string = ItemDataType> =
  | PlaceholderItem
  | VariableItem<T>
  | MixinItem<T>
  | FunctionItem<T>;

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
