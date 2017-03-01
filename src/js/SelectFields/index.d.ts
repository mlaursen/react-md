import * as React from 'react';
import { Props } from '../index';
import { TextFieldLineDirections } from '../TextFields';

export type Positions = 'tl' | 'tr' | 'br' | 'bl' | 'below';

interface SelectFieldProps extends Props {
  id: number | string;
  name?: string;
  menuId?: number | string;
  listId?: number | string;
  position?: Positions;
  listStyle?: React.CSSProperties;
  listClassName?: string;
  inputStyle?: React.CSSProperties;
  inputClassName?: string;
  value?: number | string;
  defaultValue?: number | string;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onMenuToggle?: (isOpen: boolean, event: Event) => void;
  onChange?: (value: number | string, itemIndex: number, event: Event) => void;
  menuItems?: Array<number | string | Object>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  itemLabel?: string;
  itemValue?: string;
  iconChildren?: React.ReactNode;
  iconClassName?: string;
  lineDirection?: TextFieldLineDirections;
  keyboardMatchingTimeout?: number;
  stretchList?: boolean;
  error?: boolean;
  errorText?: React.ReactNode;
  helpText?: React.ReactNode;
  helpOnFocus?: boolean;
  required?: boolean;
  toolbar?: boolean;
  fullWidth?: boolean;
}

export default class SelectField extends React.Component<SelectFieldProps, {}> { }
