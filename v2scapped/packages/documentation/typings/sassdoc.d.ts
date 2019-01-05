import * as SassDoc from "sassdoc";

export interface ISassDocLinkTo {
  name: string;
  description: string;
  type: SassDoc.SassDocType;
  group: string;
}

export interface ISassDocExample extends SassDoc.IExample {
  compiledCode?: string;
  htmlExample?: string;
}

export interface ISassDoc {
  name: string;
  type: SassDoc.Type;
  description: string;
  file: string;
  group: string;
  see: ISassDocLinkTo[];
  usedBy: ISassDocLinkTo[];
  links: SassDoc.ILink[];

  code?: string;
  resolvedValue?: string;
  value?: string;
  examples?: ISassDocExample[];
  parameters?: SassDoc.IParameter[];
  requires?: ISassDocLinkTo[];
  returns?: SassDoc.IReturn;
  throws?: SassDoc.Throw;
}

export interface IVariableLookup {
  name: string;
  type: SassDoc.Type;
  value: string;
  resolvedValue: string;
  isDefault: boolean;
}

export interface IVariableSassDoc extends ISassDoc {
  code: string;
  value: string;
  resolvedValue: string;
}

export interface IMixinSassDoc extends ISassDoc {
  code: string;
  examples: ISassDocExample[];
  parameters: SassDoc.IParameter[];
  throws: SassDoc.Throw;
}

export interface IFunctionSassDoc extends ISassDoc {
  code: string;
  examples: ISassDocExample[];
  parameters: SassDoc.IParameter[];
  returns: SassDoc.IReturn;
  throws: SassDoc.Throw;
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
  type: SassDoc.SassDocType;
  group: string;
  private: boolean;
}
