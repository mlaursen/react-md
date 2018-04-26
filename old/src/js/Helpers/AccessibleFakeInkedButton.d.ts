import { AccessibleFakeButtonProps } from './AccessibleFakeButton';
import { InjectedInkProps } from '../Inks';

export interface AccessibleFakeInkedButtonProps extends AccessibleFakeButtonProps, InjectedInkProps {
  focus: () => void;
  blur: () => void;
}

declare const AccessibleFakeInkedButton: AccessibleFakeInkedButtonProps;
export default AccessibleFakeInkedButton;
