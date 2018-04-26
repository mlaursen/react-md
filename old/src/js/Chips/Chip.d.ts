import * as React from 'react';
import { Props } from '../index';

export interface ChipProps extends Props {
  rotateIcon?: boolean;
  label: React.ReactNode;
  removable?: boolean;
  avatar?: React.ReactElement<any>;
  children?: React.ReactNode;
  labelStyle?: React.CSSProperties;
  labelClassName?: string;

  /**
   * @deprecated
   */
  iconClassName?: string;
}

declare const Chip: React.ComponentClass<ChipProps>;
export default Chip;
