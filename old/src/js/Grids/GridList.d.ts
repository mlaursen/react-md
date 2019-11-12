import * as React from 'react';
import { Props } from '../index';
import { GridProps, CellProps } from './index';

interface HOCProps {
  style?: React.CSSProperties;
  className: string;
  cellStyle?: React.CSSProperties;
  cellClassName: string;
}

export interface GridListProps extends Props, GridProps, CellProps {
  component?: React.ReactType;
  children?: React.ReactNode | ((props: HOCProps) => React.ReactNode);
  cellStyle?: React.CSSProperties;
  cellClassName?: string;
}

export interface GridListComponent extends React.ComponentClass<GridListProps> {
  getClassNames(props?: GridListProps): { className: string, cellClassName: string };
}

declare const GridList: GridListComponent;
export default GridList;
