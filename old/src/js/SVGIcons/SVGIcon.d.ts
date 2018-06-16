import * as React from 'react';
import { Props } from '../index';

export interface SVGIconProps extends Props {
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  error?: boolean;
  inherit?: boolean;
  role?: 'img' | 'presentation';
  titleAttr?: string;
  title?: string;
  desc?: string;
  use?: string;
  focusable?: string;
  size?: number;
  children?: React.ReactElement<any> | Array<React.ReactElement<any>>;
  viewBox?: string;
  xmlns?: string;
}

declare const SVGIcon: React.ComponentClass<SVGIconProps>;
export default SVGIcon;
