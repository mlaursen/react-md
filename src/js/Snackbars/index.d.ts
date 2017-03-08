import * as React from 'react';
import { Props } from '../index';

interface SnackbarProps extends Props {
  id?: number | string;
  toasts: Array<{ text: string, action?: string | { onClick?: Function, label: string }}>;
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

export default class Snackbar extends React.Component<SnackbarProps, {}> { }
export { Snackbar as SnackbarContainer };
