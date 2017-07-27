import { BaseSelectionControlProps } from './SelectionControl';

export interface SwitchProps extends BaseSelectionControlProps {
  onChange?: (checked: boolean, event: Event) => void;
}

declare const Switch: React.ComponentClass<SwitchProps>;
export default Switch;
