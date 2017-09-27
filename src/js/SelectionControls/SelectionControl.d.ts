import * as React from 'react';
import { IdPropType, Props } from '../index';

type Types = 'checkbox' | 'radio' | 'switch';

export interface BaseSelectionControlProps extends Props {
  id: IdPropType;
  name: number | string;
  label?: React.ReactNode;
  labelBefore?: boolean;
  disabled?: boolean;
  value?: number | string;
  checked?: boolean;
  defaultChecked?: boolean;
  inline?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: IdPropType;
}

export interface SelectionControlProps extends BaseSelectionControlProps {
  onChange?: (result: boolean | number | string, event: Event) => void;
  type: Types;
  checkedCheckboxIcon?: React.ReactElement<any>;
  uncheckedCheckboxIcon?: React.ReactElement<any>;
  checkedRadioIcon?: React.ReactElement<any>;
  uncheckedRadioIcon?: React.ReactElement<any>;

  /**
   * @deprecated
   */
  checkedCheckboxIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  checkedCheckboxIconClassName?: string;

  /**
   * @deprecated
   */
  uncheckedCheckboxIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  uncheckedCheckboxIconClassName?: string;

  /**
   * @deprecated
   */
  checkedRadioIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  checkedRadioIconClassName?: string;

  /**
   * @deprecated
   */
  uncheckedRadioIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  uncheckedRadioIconClassName?: string;
}

declare const SelectionControl: React.ComponentClass<SelectionControlProps>;
export default SelectionControl;
