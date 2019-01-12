export interface ICleanableCommand {
  clean: boolean;
}

export interface ITypedocConfig extends ICleanableCommand {
  packageName: string;
}

export type DocumentedSource = {
  line: number;
  path: string;
};

export type DocumentedType = {
  name: string;
  description: string;
  value: string;
};

export type DocumentedPropType = string | { name: string };
export type DocumentedProp = {
  name: string;
  type: DocumentedPropType;
  defaultValue: string;
  description: string;
};

export type DocumentedGeneric = {
  name: string;
  description: string;
};

export type InheritedProps = {
  [key: string]: string[];
};

export type DocumentedComponent = {
  name: string;
  description: string;
  source: DocumentedSource;
  props: DocumentedProp[];
  inherited: InheritedProps;
  generics: DocumentedGeneric[];
};
