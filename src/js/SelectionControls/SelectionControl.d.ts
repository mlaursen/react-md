import * as React from 'react';
import { IdPropType, Props } from '../index';

type Types = 'checkbox' | 'radio' | 'switch';

export interface BaseSelectionControlProps extends Props {
  id: IdPropType;
  name: number | string;
  labelBefore?: boolean;
  disabled?: boolean;
  value?: number | string;
  checked?: boolean;
  defaultChecked?: boolean;
  inline?: boolean;
}

export interface SelectionControlProps extends BaseSelectionControlProps {
  checkedCheckboxIconChildren?: React.ReactNode;
  checkedCheckboxIconClassName?: string;
  uncheckedCheckboxIconChildren?: React.ReactNode;
  uncheckedCheckboxIconClassName?: string;
  checkedRadioIconChildren?: React.ReactNode;
  checkedRadioIconClassName?: string;
  uncheckedRadioIconChildren?: React.ReactNode;
  uncheckedRadioIconClassName?: string;
  onChange?: (result: boolean | number | string, event: Event) => void;
  type: Types;
  'aria-label'?: string;
}

declare const SelectionControl: React.ComponentClass<SelectionControlProps>;
export default SelectionControl;
