import { DeclarationReflection, TypeParameterReflection } from "typedoc";

/**
 * A simple wrapper for the DeclarationReflection from typedoc
 */
export type ITypeDeclaration = DeclarationReflection;

export type TypeDefinitionTypes =
  | ITypeUnion
  | ITypeReference
  | ITypeReflection
  | ITypeArray
  | ISimpleValueType;

export type DeclarationComment = ICommentableDeclaration | string;

export interface ICommentableDeclaration {
  text?: string;
  shortText?: string;
}

export interface ISimpleValueType {
  type: "stringLiteral" | "intrinsic";
  // name will be provided when inside of arrays array types
  name?: string;

  // value will be provided for all others
  value?: string;
}

export interface ITypeUnion {
  type: "union";
  types: ISimpleValueType[];
}

export interface ITypeReference {
  type: "reference";
  name: string;
  typeArguments?: TypeDefinitionTypes[];
}

/**
 * This type is used to represent objects/shapes
 */
export interface ITypeReflection {
  type: "reflection";
  declaration: ITypeReflectionFunctionOrShapeDeclaration;
}

export interface ITypeReflectionDeclaration {
  children: ITypeReflectionDeclarationAttribute[];
}

export interface ITypeFunctionDeclarationSignature {
  kindString: string;
  type: TypeDefinitionTypes;
  parameters: ITypeDefinition[];
}

export interface ITypeFunctionDeclaration {
  type: TypeDefinitionTypes;
  signatures: ITypeFunctionDeclarationSignature[];
}

export interface ITypeReflectionFunctionOrShapeDeclaration {
  children?: ITypeReflectionDeclarationAttribute[];
  signatures?: ITypeFunctionDeclarationSignature[];
}

export interface ITypeReflectionDeclarationAttribute {
  name: string;
  type: TypeDefinitionTypes;
}

export interface ITypeArray {
  type: "array";
  // only tested for single type arrays so far
  elementType: ITypeReference;
}

export interface ITypeDefinition {
  kindString?: string;
  name?: string;
  comment?: ICommentableDeclaration;
  type: TypeDefinitionTypes;

  typeParameter?: TypeParameterReflection[];
}

export interface ITypeShape {
  [key: string]: TypeValue;
}

export type TypeValue = string | ITypeShape | Array<string | ITypeShape>;

export interface IMainTypescriptLibrary {
  [key: string]: IMainTypescriptLibraryType;
}

export interface IMainTypescriptLibraryType {
  name: string;
  attributes: IMainTypescriptLibraryAttribute[];
}

export interface IMainTypescriptLibraryAttribute {
  name: string;
  value: TypeValue;
  comment: string;
}
