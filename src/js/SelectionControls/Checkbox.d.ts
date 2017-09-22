import { BaseSelectionControlProps } from './SelectionControl';

export interface CheckboxProps extends BaseSelectionControlProps {
  onChange?: (checked: boolean, event: Event) => void;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;

  /**
   * @deprecated
   */
  checkedIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  checkedIconClassName?: string;

  /**
   * @deprecated
   */
  uncheckedIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  uncheckedIconClassName?: string;
}

declare const Checkbox: React.ComponentClass<CheckboxProps>;
export default Checkbox;
