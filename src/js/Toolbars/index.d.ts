import * as React from 'react';
import { Props } from '../index';

interface ToolbarProps extends Props {
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
  component?: Function | string;
  inset?: boolean;
  zDepth?: number;
}

export default class Toolbar extends React.Component<ToolbarProps, {}> { }
