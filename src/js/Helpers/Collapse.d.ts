import * as React from 'react';
import { Props } from '../index';

export interface CollapseProps extends Props {
  defaultStyle?: React.CSSProperties;
  collapsed: boolean;
  springConfig?: Object;
  children?: React.ReactElement<any>;
  animate?: boolean;
}

declare const Collapse: React.ComponentClass<CollapseProps>;
export default Collapse;
