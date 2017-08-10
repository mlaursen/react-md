import * as React from 'react';
import { Props } from '../index';
import { InjectedTooltipProps } from '../Tooltips';

export interface TableColumnProps extends Props, InjectedTooltipProps {
  fixedStyle?: React.CSSProperties;
  fixedClassName?: string;
  sorted?: boolean;
  sortIcon?: React.ReactElement<any>;
  numeric?: boolean;
  adjusted?: boolean;
  grow?: boolean;
  selectColumnHeader?: boolean;
  header?: boolean;
  children?: React.ReactNode;
  plain?: boolean;
  scope?: 'row' | 'col';
  cellIndex?: boolean;

  /**
   * @deprecated
   */
  sortIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  sortIconClassName?: string;
}

declare const TableColumn: React.ComponentClass<TableColumnProps>;
export default TableColumn;
