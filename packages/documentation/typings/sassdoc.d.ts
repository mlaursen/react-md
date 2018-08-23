import * as SassDoc from "sassdoc";

export type IExample = SassDoc.IExample;
export type IParameter = SassDoc.IParameter;
export type IRequire = SassDoc.IRequire;
export type ILink = SassDoc.ILink;
export type IReturn = SassDoc.IReturn;
export type Throw = SassDoc.Throw;
export type SassDocType = SassDoc.SassDocType;
export type Type = SassDoc.Type;

export interface ISassDocLinkTo {
  name: string;
  description: string;
  type: SassDocType;
  group: string;
}

export interface ISassDoc {
  name: string;
  type: Type;
  description: string;
  file: string;
  group: string;
  see: ISassDocLinkTo[];
  usedBy: ISassDocLinkTo[];
  links: ILink[];

  code?: string;
  examples?: IExample[];
  parameters?: IParameter[];
  requires?: IRequire[];
  returns?: IReturn;
  throws?: Throw;
}

export interface IVariableSassDoc extends ISassDoc {
  code: string;
}

export interface IMixinSassDoc extends ISassDoc {
  code: string;
  examples: IExample[];
  parameters: IParameter[];
  throws: Throw;
}

export interface IFunctionSassDoc extends ISassDoc {
  code: string;
  examples: IExample[];
  parameters: IParameter[];
  returns: IReturn;
  throws: Throw;
}

export interface IFlattenedSassDoc {
  variables: IVariableSassDoc[];
  mixins: IMixinSassDoc[];
  functions: IFunctionSassDoc[];
}

export interface IFlattenedSassDocs {
  [key: string]: IFlattenedSassDoc;
}

export interface ISassDocReference {
  name: string;
  type: SassDocType;
  group: string;
  private: boolean;
}
