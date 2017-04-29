import * as React from 'react';
import { Props } from '../index';

export interface ChipProps extends Props {
  iconClassName?: string;
  rotateIcon?: boolean;
  label: React.ReactNode;
  removable?: boolean;
  avatar?: React.ReactElement<any>;
  children?: React.ReactNode;
}

declare const Chip: React.ComponentClass<ChipProps>;
export default Chip;
