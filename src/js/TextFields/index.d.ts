import * as React from 'react';
import { Props } from '../index';

export type TextFieldTypes = 'text' | 'password' | 'number' | 'email' | 'search' | 'tel' | 'url';
export type TextFieldLineDirections = 'left' | 'center' | 'right';

interface TextFieldProps extends Props {
  inputStyle?: React.CSSProperties;
  inputClassName?: string;
  value?: number | string;
  defaultValue?: number | string;
  block?: boolean;
  paddedBlock?: boolean;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  id?: number | string;
  type?: TextFieldTypes;
  onChange?: (value: number | string, event: Event) => void;
  active?: boolean;
  error?: boolean;
  floating?: boolean;
  required?: boolean;
  lineDirection?: TextFieldLineDirections;
  leftIcon?: React.ReactElement<any>;
  leftIconStateful?: boolean;
  rightIcon?: React.ReactElement<any>;
  rightIconStateful?: boolean;
  passwordIconChildren?: React.ReactNode;
  passwordIconClassName?: string;
  passwordInitiallyVisible?: boolean;
  fullWidth?: boolean;
  rows?: number;
  maxRows?: number;
  customSize?: string;
  erorText?: string;
  helpText?: string;
  helpOnFocus?: boolean;
  maxLength?: number;
  inlineIndicator?: React.ReactElement<any>;
  pattern?: string;
  min?: number;
  max?: number;
  step?: number;
  resize?: { min: number, max: number, noShrink?: boolean };
}

export default class TextField extends React.Component<TextFieldProps, {}> {
  focus(): void;
  getField(): React.ReactHTMLElement<any> | null; // should be input or textarea, but get warning
}
