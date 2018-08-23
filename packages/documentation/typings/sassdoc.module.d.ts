declare module "sassdoc" {
  type SassDocType = "function" | "mixin" | "placeholder" | "variable";

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
    | "string"
    | string;

  type Access = "public" | "private";

  type Alias = string;
  interface IAliased {
    [key: string]: Alias[];
  }

  type Author = string[];

  type Content = string;

  type Deprecated = string;

  // http://sassdoc.com/annotations/#example
  type ExampleTypes = "css" | "scss" | "markup" | "javascript";
  interface IExample {
    type: ExampleTypes;
    description?: string;
    code: string;
  }

  type Group = Array<"undefined" | string>;

  type Ignore = string[];

  interface ILink {
    url: string;
    caption: string;
  }

  type Output = string;

  interface IParameter {
    name: string;
    type: Type;
    description: string;
    default?: string;
  }

  interface IProperty {
    name: string;
    type: Type;
    description: string;
    default?: string;
  }

  interface IRequire {
    name: string;
    type: SassDocType;

    // These appear only when manually using the @require annotation
    url?: string;
    description?: string;
    item?: Item;
  }
  interface IRequireByAnnotation extends IRequire {
    description: string;
    item: Item;
    url?: string;
  }
  interface IUsedByItem {
    context: IContext;
    description: string;
  }
  type UsedBy = IUsedByItem[];

  interface IReturn {
    type: Type;
    description: string;
  }

  interface ISee {
    description?: string;
    context: IContext;
  }

  interface ISince {
    version: string;
    description: string;
  }

  type Throw = string[];

  type ToDo = string[];

  interface Item {
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
    throws?: Throw;
    link?: ILink[];
  }

  interface IRange {
    start: number;
    end: number;
  }

  type Scope = "default" | "private";
  interface IContext {
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
  interface ItemContext extends IContext {
    scope: Scope;
  }
  interface IVariableContext extends IContext {
    value: string;
  }
  interface IMixinContext extends IContext {
    code: string;
  }
  interface IFunctionContext extends IContext {
    code: string;
  }
  interface IPlaceholderContext extends IContext {
    code: string;
  }

  interface IFile {
    name: string;
    path: string;
  }

  interface IVariableSassDoc extends Item {
    context: IVariableContext;
  }

  interface IMixinSassDoc extends Item {
    context: IMixinContext;
  }

  interface IFunctionSassDoc extends Item {
    context: IFunctionContext;
    return: IReturn;
  }

  export function parse(path: string): Promise<Item[]>;
}
