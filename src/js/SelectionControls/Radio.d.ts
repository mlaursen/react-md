import { BaseSelectionControlProps } from './SelectionControl';

export interface RadioProps extends BaseSelectionControlProps {
  onChange?: (value: number | string, event: Event) => void;
  checkedIconChildren?: React.ReactNode;
  checkedIconClassName?: string;
  uncheckedIconChildren?: React.ReactNode;
  uncheckedIconClassName?: string;
}

declare const Radio: React.ComponentClass<RadioProps>;
export default Radio;
