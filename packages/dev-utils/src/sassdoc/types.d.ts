import {
  SassDocType,
  Type,
  Link,
  Example,
  Parameter,
  Throw,
  Return,
} from "sassdoc";
import { HackedVariableValue } from "./variables";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface SassDocReference {
  name: string;
  type: SassDocType;
  group: string;
  private: boolean;
}

export interface SassDocReferenceLink
  extends Omit<SassDocReference, "private"> {
  description: string;
}

export interface BaseFormattedSassDoc {
  name: string;
  type: Type;
  description: string;
  file: string;
  group: string;
  see: SassDocReferenceLink[];
  links: Link[];
}

export interface FormattedSassDocExample extends Example {
  htmlExample?: string;
  compiledCode: string | null;
}

export interface FormattedVariableSassDoc extends BaseFormattedSassDoc {
  code: string;
  derived: boolean;
  value: HackedVariableValue;
}

export interface ParameterizedSassDoc extends BaseFormattedSassDoc {
  code: string;
  examples: FormattedSassDocExample[];
  parameters: Parameter[];
  throws: Throw;
}

export interface FormattedMixinSassDoc extends ParameterizedSassDoc {}
export interface FormattedFunctionSassDoc extends ParameterizedSassDoc {
  returns: Return;
}

export type FormattedSassDoc =
  | FormattedVariableSassDoc
  | FormattedMixinSassDoc
  | FormattedFunctionSassDoc;
