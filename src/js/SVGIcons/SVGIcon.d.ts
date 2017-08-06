import * as React from 'react';
import { Props } from '../index';

export interface SVGIconProps extends Props {
  error?: boolean;
  disabled?: boolean;
  inherit?: boolean;
  primary?: boolean;
  secondary?: boolean;
  use?: string;
  size?: number;
  children?: React.ReactElement<any> | Array<React.ReactElement<any>>;
  viewBox?: string;
  xmlns?: string;
}

declare const SVGIcon: React.ComponentClass<SVGIconProps>;
export default SVGIcon;
