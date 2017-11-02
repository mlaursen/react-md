import * as React from 'react';
import { Props } from '../index';
import { HOCProps } from './index';

export interface CellProps extends Props {
  component?: React.ReactType;
  children?: React.ReactNode | ((props: HOCProps) => React.ReactNode);
  align?: 'top' | 'middle' | 'bottom' | 'stretch';
  position?: 'center' | 'right';
  size?: number;
  order?: number;
  offset?: number;
  phoneSize?: number;
  phoneOrder?: number;
  phoneOffset?: number;
  phoneHidden?: boolean;
  tabletSize?: number;
  tabletOrder?: number;
  tabletOffset?: number;
  tabletHidden?: boolean;
  desktopSize?: number;
  desktopOrder?: number;
  desktopOffset?: number;
  desktopHidden?: boolean;
}

export interface CellComponent extends React.ComponentClass<CellProps> {
  getClassName(props?: CellProps): string;
}

declare const Cell: CellComponent;
export default Cell;
