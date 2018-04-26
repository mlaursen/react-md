import * as React from 'react';
import { Props } from '../index';

export interface ToolbarProps extends Props {
  // for the `component` prop until refactored out
  [key: string]: any;

  titleStyle?: React.CSSProperties;
  titleClassName?: string;
  prominent?: boolean;
  prominentTitle?: boolean;
  title?: React.ReactNode;
  titleMenu?: React.ReactElement<any>;
  nav?: React.ReactElement<any>;
  actions?: React.ReactElement<any> | Array<React.ReactElement<any>>;
  children?: React.ReactNode;
  fixed?: boolean;
  singleColor?: boolean;
  themed?: boolean;
  colored?: boolean;
  component?: React.ReactType;
  inset?: boolean;
  zDepth?: number;
}

declare const Toolbar: React.ComponentClass<ToolbarProps>;
export default Toolbar;
