import * as TypeDoc from "typedoc";

export interface ICleanableCommand {
  clean: boolean;
}

export interface ITypeDocConfig extends ICleanableCommand {
  combine: boolean;
  strict?: boolean;
}

export interface IDeclarationGeneric {
  name: string;
  comment: string;
}

// export interface IDeclarationReflection extends TypeDoc.DeclarationReflection {
//   // it is typeParameters from declaration files, but typeParameter in json output
//   typeParameter?: TypeDoc.TypeParameterReflection[];
// }

// /////////////////////////////////////////////
// // custom stuff for documentation
// export interface ICommentable {
//   text?: string;
//   shortText?: string;
// }
// export type Comment = string | ICommentable;

// export interface IStringUnionType {
//   type: "stringLiteral";
//   value: string;
// }

// export type UnionTypeList = IStringUnionType[];

// export interface IUnionType {
//   type: "union";
//   types: UnionTypeList;
// }

// export interface ITypeReference {
//   type: "reference";
//   name: string;

//   id?: number;
//   typeArguments?: { type: "typeParameter"; name: string; comment?: ICommentable };
// }
// export type IntersectionTypeList = ITypeReference[];

// export interface IIntersectionType {
//   type: "intersection";
//   types: IntersectionTypeList;
// }

// export interface ITypeDefinition {
//   name: string;
//   comment?: ICommentable;
//   type: IUnionType;

//   // for generics
//   typeParameter?: TypeDoc.TypeParameterReflection[];
// }
