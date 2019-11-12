import * as React from 'react';
import { Props } from '../index';
import { HOCProps } from './index';

export interface GridProps extends Props {
  component?: React.ReactType;
  children?: React.ReactNode | ((props: HOCProps) => React.ReactNode);
  container?: string;
  stacked?: boolean;
  noSpacing?: boolean;
  gutter?: number;
  spacing?: number;
}

export interface GridComponent extends React.ComponentClass<GridProps> {
  getClassName(props?: GridProps): string;
}

declare const Grid: GridComponent;
export default Grid;
