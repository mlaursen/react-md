/* tslint:disable:max-line-length */
export type TypeReferences = string[];
export type TypeParameters = ITypeParameter[];
export type InterfaceExtends = string[];
export type DocumentedType =
  | IDocumentedComponent
  | IDocumentedType
  | IDocumentedInterface
  | IDocumentedDefaultProps;
export type DocumentableTypes = "type" | "interface" | "component" | "default-props";

export type InterfaceOrDefaultProps = IDocumentedInterface | IDocumentedDefaultProps;

export type DefaultPropsAttribute = Pick<
  IDocumentedInterfaceAttribute,
  "name" | "type" | "typeReferences" | "typeParameterReferences"
>;

/**
 * This is the result of doing an `@see` annotation in a comment. This can either be a normal link to a url,
 * or a link to some documentable thing in react-md.
 *
 * Examples:
 * @see {@link https://google.com}
 * @see {@link https://google.com|Google}
 * @see {@link https://google.com} See google for more information
 * @see {@link https://google.com|Google} See google for more information
 * @see {@link typography/Text}
 * @see {@link typography/Text#children}
 * @see {@link typography/Text#children} See the Text component's children prop for more information.
 * @see {@link tree-view/buildTree} See the buildTree function for more information
 * @see {@link tree-view/buildTree#list} - See the buildTree's list parameter.
 * @see {@link typography/variable#rmd-typography-font-family}
 * @see {@link typography/mixin#rmd-typography-base}
 * @see {@link theme/function#rmd-theme-luminance}
 *
 * Results in:
 * <a href="https://google.com">https://google.com</a>
 * <a href="https://google.com">Google</a>
 * <a href="https://google.com">https://google.com</a> - See google for more information
 * <a href="https://google.com">Google</a> - See google for more information
 * <a href="/packages/typography/text">Text</a>
 * <a href="/packages/typography/text#prop-children">Text.children</a>
 * <a href="/packages/typography/text#prop-children">Text.children</a> - See the Text component's children prop for more information
 * <a href="/packages/tree-view/build-tree">buildTree</a> - See the buildTree function for more information
 * <a href="/packages/tree-view/build-tree#parameter-list">buildTree.list</a> See the buildTree's list parameter
 * <a href="/packages/typography/sassdoc#variable-rmd-typography-font-family">$rmd-typography-font-family</a>
 * <a href="/packages/typography/sassdoc#mixin-rmd-typography-base">@mixin rmd-typography-base</a>
 * <a href="/packages/theme/sassdoc#function-rmd-theme-luminance">@function rmd-theme-luminance</a>
 */
export interface ILinkTo {
  title: string;
  href: string;
  description: string;
}

export interface ITypeParameter {
  name: string;
  description: string;
  defaultValue: string;
  type: string;
  typeReferences: TypeReferences;
}

export interface IDocumentableType {
  name: string;
  source: string;
  sourceLine: number;
  description: string;
  typeParameters: TypeParameters;
  typeReferences: TypeReferences;
  links: ILinkTo[];
}

export interface IDocumentedInterfaceAttribute {
  name: string;
  description: string;
  defaultValue: string;
  required: boolean;
  type: string;
  typeReferences: TypeReferences;
  typeParameterReferences: TypeReferences;
}

export interface IDocumentedComponent extends IDocumentableType {
  type: "component";
  props: string;
}

export interface IDocumentedType extends IDocumentableType {
  type: "type";
  tsType: "union" | "intersection" | "reflection" | "function reflection";
  value: string;
}

export interface IDocumentedInterface extends IDocumentableType {
  type: "interface";
  extends: InterfaceExtends;
  attributes: IDocumentedInterfaceAttribute[];
}

export interface IDocumentedDefaultProps extends IDocumentableType {
  type: "default-props";
  extends: InterfaceExtends;
  attributes: DefaultPropsAttribute[];
}

export interface IDocumentedFile {
  [key: string]: DocumentedType;
}

export interface IDocumentedPackage {
  [key: string]: IDocumentedFile;
}
