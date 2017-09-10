import * as React from 'react';
import { IdPropType, Props } from '../index';

export interface SelectionControlGroupProps extends Props {
  // for the `component` prop until refactored out
  [key: string]: any;

  controlStyle?: React.CSSProperties;
  controlClassName?: string;
  id?: IdPropType;
  type: 'checkbox' | 'radio';
  component?: React.ReactType;
  label?: React.ReactNode;
  labelClassName?: string;
  labelComponent?: React.ReactType;
  onChange?: (value: string, event: Event) => void;
  name?: string | number;
  defaultValue?: number | string;
  value?: number | string;
  controls: Array<{ key?: number | string, label: React.ReactNode, value: number | string }>;
  disabled?: boolean;
}

declare const SelectionControlGroup: React.ComponentClass<SelectionControlGroupProps>;
export default SelectionControlGroup;
