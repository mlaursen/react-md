import { BaseSelectionControlProps } from './SelectionControl';

export interface CheckboxProps extends BaseSelectionControlProps {
  onChange?: (checked: boolean, event: Event) => void;
  checkedIconChildren?: React.ReactNode;
  checkedIconClassName?: string;
  uncheckedIconChildren?: React.ReactNode;
  uncheckedIconClassName?: string;
}

declare const Checkbox: React.ComponentClass<CheckboxProps>;
export default Checkbox;
