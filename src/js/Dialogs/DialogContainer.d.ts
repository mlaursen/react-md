import * as React from 'react';
import { Props } from '../index';

import { DialogProps } from './Dialog';

export interface DialogContainerProps extends DialogProps {
  // for the `component` prop until refactored out
  [key: string]: any;

  dialogStyle?: React.CSSProperties;
  dialogClassName?: string;
  component?: React.ReactType;
  visible: boolean;
  onShow?: Function;
  onHide?: Function;
  modal?: boolean;
  pageX?: number;
  pageY?: number;
  transitionEnterTimeout?: number;
  transitionLeaveTimeout?: number;
  closeOnEsc?: boolean;
  portal?: boolean;
  renderNode?: Object;
  lastChild?: boolean;
  defaultVisibleTransitionable?: boolean;
}

declare const DialogContainer: React.ComponentClass<DialogContainerProps>;
export default DialogContainer;
