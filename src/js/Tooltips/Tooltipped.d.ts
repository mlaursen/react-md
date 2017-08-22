import * as React from 'react';
import { Props } from '../index';
import { Positions } from './injectTooltip';

export interface TooltippedProps extends Props {
  children: React.ReactElement<any>;
  setPosition?: boolean;

  label?: React.ReactNode;
  position?: Positions;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
  tooltipStyle?: React.CSSProperties;
  tooltipClassName?: string;
  enterTimeout?: number;
  leaveTimeout?: number;
  container?: (HTMLElement: HTMLElement) => HTMLElement;
  target?: React.ReactElement<any> | ((HTMLElement: HTMLElement) => React.ReactElement<any>);
}

declare const Tooltipped: React.ComponentClass<TooltippedProps>;
export default Tooltipped;
