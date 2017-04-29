import * as React from 'react';
import { Props } from '../index';

export interface AccessibleFakeButtonProps {
  noFocusOutline?: boolean;
  tabbedClassName?: string;
  onTabFocus?: (event: Event) => void;
  component?: React.ReactType;
  tabIndex?: number;
  disabled?: boolean;
  role?: string;
  children?: React.ReactNode;
}

interface AccessibleFakeButtonComponent extends React.ComponentClass<AccessibleFakeButtonProps> {
  focus: () => void;
  blur: () => void;
}

declare const AccessibleFakeButton: AccessibleFakeButtonComponent;
export default AccessibleFakeButton;
