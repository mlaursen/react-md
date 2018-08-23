declare module "*.svg";
declare module "*.png";

declare module "sassdoc" {
  type SassDocType = "function" | "mixin" | "placeholder" | "variable";
  // couldn't figure out how to declare this correctly...

  /* tslint:disable:interface-name no-namespace */
  // this can also be a combination of these together with pipes in between
  type Type =
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
    | "string";

  type Access<A = string> = "public" | "private" | A;

  type Alias = string;
  interface Aliased {
    [key: string]: Alias[];
  }

  type Author = string[];

  type Content = string;

  type Deprecated = string;

  // http://sassdoc.com/annotations/#example
  type ExampleTypes = "css" | "scss" | "markup" | "javascript";
  interface Example {
    type: ExampleTypes;
    description?: string;
    code: string;
  }
  type ExampleList = Example[];

  type Group<G = "undefined" | string> = G[];

  type Ignore = string[];

  interface Link {
    url: string;
    caption: string;
  }
  type LinkList = Link[];

  type Output = string;

  interface Parameter {
    name: string;
    type: Type;
    description: string;
    default?: string;
  }
  type ParameterList = Parameter[];

  interface Property {
    name: string;
    type: Type;
    description: string;
    default?: string;
  }
  export type PropertyList = Property[];

  interface Require {
    name: string;
    type: SassDocType;

    // These appear only when manually using the @require annotation
    url?: string;
    description?: string;
    item?: Item;
  }
  interface RequireAnnotation extends Require {
    description: string;
    item: Item;
    url?: string;
  }
  interface UsedByItem {
    context: Context;
    description: string;
  }
  type RequireList = Require[];
  type RequireAnnotationList = RequireAnnotation[];
  type UsedBy = UsedByItem[];

  interface Return {
    type: Type;
    description: string;
  }

  interface See {
    description?: string;
    context: Context;
  }
  type SeeList = See[];

  interface Since {
    version: string;
    description: string;
  }
  type SinceList = Since[];

  type Throw = string[];

  type ToDo = string[];

  interface Item {
    access: Access;
    context: Context;
    commentRange: Range;
    description: string;
    file: File;
    group: Group;
    type: Type;

    example?: ExampleList;
    parameter?: ParameterList;
    require?: RequireList;
    return?: Return;
    usedBy?: UsedBy;
    see?: SeeList;
    throws?: Throw;
    link?: LinkList;
  }

  interface Range {
    start: number;
    end: number;
  }

  interface Context {
    name: string;
    type: SassDocType;
    line: Range;

    // only appears at root level
    scope?: "default" | string;

    // only appears for mixins and functions
    code?: string;

    // only appears for variables
    value?: string;
  }
  interface ItemContext extends Context {
    scope: "default" | "";
  }
  interface VariableContext extends Context {
    value: string;
  }
  interface MixinContext extends Context {
    code: string;
  }
  interface FunctionContext extends Context {
    code: string;
  }
  interface PlaceholderContext extends Context {
    code: string;
  }

  interface File {
    name: string;
    path: string;
  }

  interface VariableSassDoc extends Item {
    context: VariableContext;
  }

  interface MixinSassDoc extends Item {
    context: MixinContext;
  }

  interface FunctionSassDoc extends Item {
    context: FunctionContext;
    return: Return;
  }

  export function parse(path: string): Promise<Item[]>;
}
