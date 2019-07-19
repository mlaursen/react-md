declare module "sassdoc" {
  export type SassDocType = "function" | "mixin" | "placeholder" | "variable";

  // this can also be a combination of these together with pipes in between
  export type Type =
    | "Number"
    | "Bool"
    | "Color"
    | "List"
    | "Map"
    | "string"
    | "number"
    | "bool"
    | "color"
    | "list"
    | "map"
    | "string"
    | string;

  export type Access = "public" | "private";

  export type Alias = string;
  export interface Aliased {
    [key: string]: Alias[];
  }

  export type Author = string[];

  export type Content = string;

  export type Deprecated = string;

  // http://sassdoc.com/annotations/#example
  export type ExampleTypes = "css" | "scss" | "markup" | "javascript" | "html";
  export interface Example {
    type: ExampleTypes;
    description?: string;
    code: string;
  }

  export type Group = ("undefined" | string)[];

  export type Ignore = string[];

  export interface Link {
    url: string;
    caption: string;
  }

  export type Output = string;

  export interface Parameter {
    name: string;
    type: Type;
    description: string;
    default?: string;
  }

  export interface Property {
    name: string;
    type: Type;
    description: string;
    default?: string;
  }

  export interface Require {
    name: string;
    type: SassDocType;

    // These appear only when manually using the @require annotation
    url?: string;
    description?: string;
    item?: Item;
  }
  export interface RequireByAnnotation extends Require {
    description: string;
    item: Item;
    url?: string;
  }
  export interface UsedByItem {
    context: Context;
    description: string;
  }
  export type UsedBy = UsedByItem[];

  export interface Return {
    type: Type;
    description: string;
  }

  export interface See {
    description?: string;
    context: Context;
  }

  export interface Since {
    version: string;
    description: string;
  }

  export type Throw = string[];

  export type ToDo = string[];

  export interface Item {
    access: Access;
    context: Context;
    commentRange: Range;
    description: string;
    file: File;
    group: Group;
    type: Type;

    example?: Example[];
    parameter?: Parameter[];
    require?: Require[];
    return?: Return;
    usedBy?: UsedBy;
    see?: See[];
    throw?: Throw;
    link?: Link[];
  }

  export interface Range {
    start: number;
    end: number;
  }

  export type Scope = "default" | "private";
  export interface Context {
    name: string;
    type: SassDocType;
    line: Range;

    // only appears at root level
    scope?: Scope;

    // only appears for mixins and functions
    code?: string;

    // only appears for variables
    value?: string;
  }
  export interface ItemContext extends Context {
    scope: Scope;
  }
  export interface VariableContext extends Context {
    type: "variable";
    value: string;
  }
  export interface MixinContext extends Context {
    type: "mixin";
    code: string;
  }
  export interface FunctionContext extends Context {
    type: "function";
    code: string;
  }
  export interface PlaceholderContext extends Context {
    type: "placeholder";
    code: string;
  }

  export interface File {
    name: string;
    path: string;
  }

  export interface VariableSassDoc extends Item {
    context: VariableContext;
  }

  export interface MixinSassDoc extends Item {
    context: MixinContext;
  }

  export interface FunctionSassDoc extends Item {
    context: FunctionContext;
    return: Return;
  }

  export type ItemSassDoc = VariableSassDoc | MixinSassDoc | FunctionSassDoc;

  export interface ParseOptions {
    dest?: string;
    exclude?: string[];
    package?: string;
    theme?: string;
    autofill?: string[];
    groups?: { [key: string]: string };
    verbose?: boolean;
    strict?: boolean;
  }

  export function parse(
    path: string,
    options?: ParseOptions
  ): Promise<ItemSassDoc[]>;
}
