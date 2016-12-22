import * as React from 'react';
import { Props } from '../index';

import { ButtonProps } from '../Buttons';

interface DialogProps extends Props {
  id: number | string;
  'aria-describedby'?: number | string;
  'aria-labelledby'?: number | string;
  'aria-label'?: string;
  dialogStyle?: React.CSSProperties;
  dialogClassName?: string;
  contentStyle?: React.CSSProperties;
  contentClassName?: string;
  component?: Function | string;
  contentComponent?: Function | string;
  actions: React.ReactElement<any> | ButtonProps | Array<React.ReactElement<any> | ButtonProps>;
  visible: boolean;
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
  renderNode?: Object;
}

export default class Dialog extends React.Component<DialogProps, {}> { }
export { Dialog };
export { Dialog as DialogContainer };
