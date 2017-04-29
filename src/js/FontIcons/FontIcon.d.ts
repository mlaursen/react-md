import * as React from 'react';
import { Props } from '../index';

export interface FontIconProps extends Props {
  children?: React.ReactNode;
  iconClassName?: string;
  disabled?: boolean;
  forceSize?: boolean | number;
  forceFontSize?: boolean;
}

declare const FontIcon: React.ComponentClass<FontIconProps>;
export default FontIcon;
