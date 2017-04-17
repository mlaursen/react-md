import * as React from 'react';
import { Props } from '../index';

import { ButtonProps } from '../Buttons';

interface SharedDialogProps extends Props {
  id: number | string;
  'aria-describedby'?: number | string;
  'aria-labelledby'?: number | string;
  'aria-label'?: string;
  contentStyle?: React.CSSProperties;
  contentClassName?: string;
  contentComponent?: Function | string;
  contentProps?: Object;
  actions?: React.ReactElement<any> | ButtonProps | Array<React.ReactElement<any> | ButtonProps>;
  paddedContent?: boolean;
  autopadContent?: boolean;
  children?: React.ReactNode;
  initialFocus?: string;
  focusOnMount?: boolean;
  additionalFocusKeys?: Array<number>;
  containFocus?: boolean;
  visible: boolean;
}

interface DialogContainerProps extends SharedDialogProps {
  dialogStyle?: React.CSSProperties;
  dialogClassName?: string;
  component?: Function | string;
  onShow?: Function;
  onHide?: Function;
  modal?: boolean;
  fullPage?: boolean;
  pageX?: number;
  pageY?: number;
  focusOnMount?: boolean;
  transitionEnterTimeout?: number;
  transitionLeaveTimeout?: number;
  closeOnEsc?: boolean;
  portal?: boolean;
  renderNode?: Object;
  lastChild?: boolean;
}

interface DialogProps extends SharedDialogProps {
  title?: React.ReactNode;
}

export default class DialogContainer extends React.Component<DialogContainerProps, {}> { }
declare class Dialog extends React.Component<DialogProps, {}> { }

export { DialogContainer, Dialog };
