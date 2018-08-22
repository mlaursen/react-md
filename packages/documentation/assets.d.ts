declare module "*.svg";
declare module "*.png";

declare module "sassdoc" {
  // couldn't figure out how to declare this correctly...

  /* tslint:disable:interface-name no-namespace */
  // this can also be a combination of these together with pipes in between
  type SassTypes =
    | "Number"
    | "Bool"
    | "Color"
    | "List"
    | "Map"
    | "Function"
    | "string"
    | "number"
    | "bool"
    | "color"
    | "list"
    | "map"
    | "function"
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

  type Group<G = string> = G[];

  type Ignore = string[];

  interface Link {
    url: string;
    caption: string;
  }
  type LinkList = Link[];

  type Output = string;

  interface Parameter {
    name: string;
    type: SassTypes;
    description: string;
    default?: string;
  }
  type ParameterList = Parameter[];

  interface Property {
    name: string;
    type: SassTypes;
    description: string;
    default?: string;
  }
  export type PropertyList = Property[];

  interface Require {
    name: string;
    type: SassTypes;

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
    type: SassTypes;
    description: string;
  }

  interface See {
    description?: string;
    context: Context;
  }

  interface Since {
    version: string;
    description: string;
  }
  type SinceList = Since[];

  type Throw = string[];

  type ToDo = string[];

  type Type = SassTypes;

  interface Item {
    access: Access;
    context: Context;
    commentRange: Range;
    description: string;
    file: File;
    group: Group;
    type: SassTypes;

    example?: ExampleList;
    parameter?: ParameterList;
    require?: RequireList;
    usedBy?: UsedBy;
  }
  interface ItemWithExample extends Item {
    example: ExampleList;
  }
  interface ItemWithRequire extends Item {
    require: RequireList;
  }
  interface ItemWithParameter extends Item {
    parameter: ParameterList;
  }
  interface ItemWithUsedBy extends Item {
    usedBy: UsedBy;
  }

  interface Range {
    start: number;
    end: number;
  }

  interface Context {
    name: string;
    type: SassTypes;
    line: Range;

    // only appears at root level
    scope?: "default" | string;

    // only appears for mixins and functions
    code?: string;

    // only appears for variables
    value?: string;
  }
  interface ItemContext extends Context {
    scope: "default" | string;
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

  export function parse(path: string): Promise<Item[]>;
}
