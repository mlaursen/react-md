import * as React from 'react';
import { Props } from '../index';

import { DialogProps } from './Dialog';

export interface DialogContainerProps extends DialogProps {
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
}

declare const DialogContainer: React.ComponentClass<DialogContainerProps>;
export default DialogContainer;
