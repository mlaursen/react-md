import * as React from 'react';
import { IdPropType, Props } from '../index';

export interface SnackbarProps extends Props {
  id?: IdPropType;
  toasts: Array<{
    text: React.ReactNode,
    action?: React.ReactNode | { onClick?: Function, label: React.ReactNode }
  }>;
  onDismiss: Function;
  autohide?: boolean;
  autohideTimeout?: number;
  transitionName?: string;
  transitionEnterTimeout?: number;
  transitionLeaveTimeout?: number;
  fab?: any; // Don't know how to really validate this one
  portal?: boolean;
  renderNode?: Object;
  lastChild?: boolean;
}

declare const Snackbar: React.ComponentClass<SnackbarProps>;
export default Snackbar;
