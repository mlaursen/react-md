import * as React from 'react';
import { Props } from '../index';

export interface AccessibleFakeButtonProps {
  // for the `component` prop until refactored out
  [key: string]: any;

  noFocusOutline?: boolean;
  tabbedClassName?: string;
  onTabFocus?: (event: Event) => void;
  component?: React.ReactType;
  tabIndex?: number;
  disabled?: boolean;
  role?: string;
  children?: React.ReactNode;
}

export interface AccessibleFakeButtonComponent extends React.ComponentClass<AccessibleFakeButtonProps> {
  focus: () => void;
  blur: () => void;
}

declare const AccessibleFakeButton: AccessibleFakeButtonComponent;
export default AccessibleFakeButton;
