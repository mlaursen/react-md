import * as React from 'react';
import { Props } from '../index';

export interface IconSeparatorProps extends Props {
  // for the `component` prop until refactored out
  [key: string]: any;

  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  label: React.ReactNode;
  children?: React.ReactNode;
  iconBefore?: boolean;
  component?: React.ReactType;
}

declare const IconSeparator: React.ComponentClass<IconSeparatorProps>;
export default IconSeparator;
