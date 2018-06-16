import * as React from 'react';
import { Props } from '../index';

export interface BadgeProps extends Props {
  // for the `component` prop until refactored out
  [key: string]: any;

  badgeStyle?: React.CSSProperties;
  badgeClassName?: string;
  badgeId: string | number;
  children?: React.ReactNode;
  component?: React.ReactType;
  badgeContent: number | string | React.ReactNode;
  max?: number;
  primary?: boolean;
  secondary?: boolean;
  default?: boolean;
  circular?: boolean;
  invisibleOnZero?: boolean;
}

declare const Badge: React.ComponentClass<BadgeProps>;
export default Badge;
