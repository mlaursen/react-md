import { BaseSelectionControlProps } from './SelectionControl';

export interface RadioProps extends BaseSelectionControlProps {
  onChange?: (value: number | string, event: Event) => void;
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

declare const Radio: React.ComponentClass<RadioProps>;
export default Radio;
