import * as React from 'react';
import { Props } from '../index';

export interface DividerProps extends Props {
  vertical?: boolean;
  inset?: boolean;
  children?: React.ReactNode;
}

declare const Divider: React.ComponentClass<DividerProps>;
export default Divider;
