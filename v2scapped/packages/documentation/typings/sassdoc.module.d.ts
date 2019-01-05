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
  export interface IAliased {
    [key: string]: Alias[];
  }

  export type Author = string[];

  export type Content = string;

  export type Deprecated = string;

  // http://sassdoc.com/annotations/#example
  export type ExampleTypes = "css" | "scss" | "markup" | "javascript" | "html";
  export interface IExample {
    type: ExampleTypes;
    description?: string;
    code: string;
  }

  export type Group = Array<"undefined" | string>;

  export type Ignore = string[];

  export interface ILink {
    url: string;
    caption: string;
  }

  export type Output = string;

  export interface IParameter {
    name: string;
    type: Type;
    description: string;
    default?: string;
  }

  export interface IProperty {
    name: string;
    type: Type;
    description: string;
    default?: string;
  }

  export interface IRequire {
    name: string;
    type: SassDocType;

    // These appear only when manually using the @require annotation
    url?: string;
    description?: string;
    item?: Item;
  }
  export interface IRequireByAnnotation extends IRequire {
    description: string;
    item: Item;
    url?: string;
  }
  export interface IUsedByItem {
    context: IContext;
    description: string;
  }
  export type UsedBy = IUsedByItem[];

  export interface IReturn {
    type: Type;
    description: string;
  }

  export interface ISee {
    description?: string;
    context: IContext;
  }

  export interface ISince {
    version: string;
    description: string;
  }

  export type Throw = string[];

  export type ToDo = string[];

  export interface Item {
    access: Access;
    context: IContext;
    commentRange: IRange;
    description: string;
    file: IFile;
    group: Group;
    type: Type;

    example?: IExample[];
    parameter?: IParameter[];
    require?: IRequire[];
    return?: IReturn;
    usedBy?: UsedBy;
    see?: ISee[];
    throw?: Throw;
    link?: ILink[];
  }

  export interface IRange {
    start: number;
    end: number;
  }

  export type Scope = "default" | "private";
  export interface IContext {
    name: string;
    type: SassDocType;
    line: IRange;

    // only appears at root level
    scope?: Scope;

    // only appears for mixins and functions
    code?: string;

    // only appears for variables
    value?: string;
  }
  export interface ItemContext extends IContext {
    scope: Scope;
  }
  export interface IVariableContext extends IContext {
    value: string;
  }
  export interface IMixinContext extends IContext {
    code: string;
  }
  export interface IFunctionContext extends IContext {
    code: string;
  }
  export interface IPlaceholderContext extends IContext {
    code: string;
  }

  export interface IFile {
    name: string;
    path: string;
  }

  export interface IVariableSassDoc extends Item {
    context: IVariableContext;
  }

  export interface IMixinSassDoc extends Item {
    context: IMixinContext;
  }

  export interface IFunctionSassDoc extends Item {
    context: IFunctionContext;
    return: IReturn;
  }

  export function parse(path: string): Promise<Item[]>;
}
