export type SassDocType = 'function' | 'mixin' | 'selector' | 'variable';
export type SassDocExampleType = 'css' | 'scss' | 'markup' | 'javascript';

export interface ISassDocLink {
  url: string;
  caption?: string;
}

export interface ISassDocFileRange {
  start: number;
  end: number;
}

export interface ISassDocFile {
  path: string;
  name: string;
}

export interface ISassDocContext {
  name: string;
  type: SassDocType;
  code: string;
  line: ISassDocFileRange;
}

export interface ISassDocVariableContext extends ISassDocContext {
  scope: string;
}

export interface ISassDocExample {
  type: SassDocExampleType;
  description: string;
  code: string;
}

export interface ISassDocParameter {
  name: string;
  type?: SassDocType;
  description?: string;
  default?: string;
}

export interface ISassDocProperty {
  path: string;
  type?: SassDocType;
  default?: string;
  description?: string;
}

export interface ISassDocRequire {
  name: string;

  /**
   * This is the sassdoc item that is required.
   */
  item: SassDoc;
  type?: SassDocType;
  description?: string;
  url?: string;
}

export interface ISassDocReturn {
  type?: SassDocType;
  description: string;
}

export interface ISassDocSince {
  version: string;
  description?: string;
}

export type SassDocAuthor = string;
export type SassDocAccess = 'public' | 'private';
export type SassDocGroup = 'undefined' | string;

export interface ISassDocBase {
  access: SassDocAccess[];
  commentRange: ISassDocFileRange;
  context: ISassDocContext | ISassDocVariableContext;
  description: string;
  group: SassDocGroup[];
  file: ISassDocFile;
}

export interface ISassDocDecorators {
  /**
   * The sassdoc item that used the @alias decorator.
   */
  alias?: string;

  /**
   * The sassdoc item that is the target of the item that used the @alias decorator.
   */
  aliased?: string[];

  /**
   * A list of authors when using the @author decorator
   */
  author?: SassDocAuthor[];

  /**
   * The value of the @content decorator.
   */
  content?: string;

  /**
   * The deprecated string with the @deprecated decorator.
   */
  deprecated?: string;

  /**
   * A list of examples when using the repeatable @example decorator.
   */
  example?: ISassDocExample[];

  /**
   * A list of links when using the repeatable @link decorator.
   */
  link?: ISassDocLink[];

  /**
   * Any output from the @output decorator.
   */
  output?: string;

  /**
   * A list of props when using the @prop decorator. This is mostly used for documenting
   * Maps.
   */
  property?: ISassDocProperty[];

  /**
   * A list of required SassDoc items when using the @require decorator or after being considered
   * "required" from the SassDoc parser.
   */
  require?: ISassDocRequire[];

  /**
   * A list of SassDoc references when using the @require decorator or after being considered "required"
   * from the SassDoc parser.
   */
  usedBy?: SassDoc[];

  /**
   * The result of using the @return decorator.
   */
  return?: ISassDocReturn;

  /**
   * The results of using the @since decorator.
   */
  since?: ISassDocSince;

  /**
   * A list of error messages that can be thrown. This is the result of using the @throw decorator or when the
   * SassDoc parser encounters an @error in the code of a function or mixin.
   */
  throw?: string[];

  /**
   * The result of using the repeatable @todo decorator.
   */
  todo?: string[];

  /**
   * The result of using the @type decorator. This should almost always be used for variables.
   */
  type?: string;
}

export interface ISassDocVariable extends ISassDocBase, ISassDocDecorators {
  context: ISassDocVariableContext;
  type: string;
}

export interface ISassDocFunction extends ISassDocBase, ISassDocDecorators {
  context: ISassDocContext;
  parameter: ISassDocParameter[];
  return: ISassDocReturn;
}

// not too sure since I don't use these anymore
export interface ISassDocSelector extends ISassDocBase, ISassDocDecorators {
  context: ISassDocContext;
}

export interface ISassDocMixin extends ISassDocBase, ISassDocDecorators {
  context: ISassDocContext;
  parameter: ISassDocParameter[];
}

export type SassDoc = ISassDocVariable | ISassDocFunction | ISassDocMixin | ISassDocSelector;
