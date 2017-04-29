import * as React from 'react';
import { Props } from '../index';

export interface IconSeparatorProps extends Props {
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  label: React.ReactNode;
  children?: React.ReactNode;
  iconBefore?: boolean;
  component?: React.ReactType;
}

declare const IconSeparator: React.ComponentClass<IconSeparatorProps>;
export default IconSeparator;
