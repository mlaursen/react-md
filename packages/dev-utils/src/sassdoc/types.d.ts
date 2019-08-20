import {
  Example,
  Link,
  Parameter,
  Return,
  SassDocType,
  Throw,
  Type,
} from "sassdoc";

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
  /**
   * The value for the variable.C Tis
   */
  value: string;

  /**
   * The compiled/resolved value for the variable. This will only be different
   * than the `value` key when the value contains an `if` or any other variables.
   */
  compiledValue: string;

  /**
   * Boolean if the value was created using the !default flag so it can
   * be overridden.
   */
  configurable: boolean;
}

export interface ParameterizedSassDoc extends BaseFormattedSassDoc {
  code: string;
  oneLineCode: string;
  examples: FormattedSassDocExample[];
  parameters: Parameter[];
  throws: Throw;
}

export type FormattedMixinSassDoc = ParameterizedSassDoc;
export interface FormattedFunctionSassDoc extends ParameterizedSassDoc {
  returns: Return;
}

export type FormattedSassDoc =
  | FormattedVariableSassDoc
  | FormattedMixinSassDoc
  | FormattedFunctionSassDoc;

export interface PackageSassDoc {
  name: string;
  variables: FormattedVariableSassDoc[];
  functions: FormattedFunctionSassDoc[];
  mixins: FormattedMixinSassDoc[];
}

export interface PackageSassDocRecord {
  [name: string]: PackageSassDoc;
}
