import * as React from 'react';
import { IdPropType, Props } from '../index';

export type TextFieldTypes = 'text' | 'password' | 'number' | 'email' | 'search' | 'tel' | 'url';
export type TextFieldLineDirections = 'left' | 'center' | 'right';

export interface SharedTextFieldProps {
  inputStyle?: React.CSSProperties;
  inputClassName?: string;
  block?: boolean;
  paddedBlock?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  placeholder?: string;
  type?: TextFieldTypes;
  active?: boolean;
  error?: boolean;
  floating?: boolean;
  required?: boolean;
  lineDirection?: TextFieldLineDirections;
  leftIcon?: React.ReactElement<any>;
  leftIconStateful?: boolean;
  rightIcon?: React.ReactElement<any>;
  rightIconStateful?: boolean;
  passwordIcon?: React.ReactElement<any>;
  passwordInitiallyVisible?: boolean;
  fullWidth?: boolean;
  rows?: number;
  maxRows?: number;
  customSize?: string;
  errorText?: React.ReactNode;
  helpText?: React.ReactNode;
  helpOnFocus?: boolean;
  maxLength?: number;
  inlineIndicator?: React.ReactElement<any>;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  resize?: { min: number, max: number, disableShrink?: boolean };
  tabIndex?: number;

  /**
   * @deprecated
   */
  passwordIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  passwordIconClassName?: string;
}

export interface TextFieldProps extends SharedTextFieldProps, Props {
  id?: IdPropType;
  value?: number | string;
  defaultValue?: number | string;
  onChange?: (value: number | string, event: Event) => void;
  onDoubleClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLElement>) => void;

  /**
   * @deprecated
   */
  icon?: React.ReactNode;

  /**
   * @deprecated
   */
  floatingLabel?: boolean;

  /**
   * @deprecated
   */
  adjustMinWidth?: boolean;
}

export interface TextFieldComponent extends React.ComponentClass<TextFieldProps> {
  focus(): void;
  getField(): React.ReactHTMLElement<any> | null; // should be input or textarea, but get warning
}

declare const TextField: TextFieldComponent;
export default TextField;
