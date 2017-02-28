import * as React from 'react';
import { Props } from '../index';

interface BadgeProps extends Props {
  badgeStyle?: React.CSSProperties;
  badgeClassName?: string;
  badgeId: string | number;
  children: React.ReactNode;
  component?: string | Function,
  badgeContent: number | string | React.ReactNode;
  max?: number;
  primary?: boolean;
  secondary?: boolean;
  default?: boolean;
  circular?: boolean;
  invisibleOnZero?: boolean;
}

export default class Badge extends React.Component<BadgeProps, {}> { }
