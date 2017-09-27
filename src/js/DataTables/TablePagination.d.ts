import * as React from 'react';
import { Props, IdPropType } from '../index';

export interface TablePaginationProps extends Props {
  id?: IdPropType;
  incrementId?: IdPropType;
  decrementId?: IdPropType;
  selectFieldStyle?: React.CSSProperties;
  selectFieldClassName?: string;
  selectFieldInputStyle?: React.CSSProperties;
  selectFieldInputClassName?: string;
  onPagination: (startIndex: number, rowsPerPage: number, currentPage: number) => void;
  rowsPerPage?: number;
  page?: number;
  defaultPage?: number;
  defaultRowsPerPage?: number;
  rowsPerPageLabel?: React.ReactNode;
  rowsPerPageItems?: Array<number>;
  rows: number;
  incrementIcon?: React.ReactElement<any>;
  decrementIcon?: React.ReactElement<any>;
  simplifiedMenu?: boolean;

  /**
   * @deprecated
   */
  incrementIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  incrementIconClassName?: string;

  /**
   * @deprecated
   */
  decrementIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  decrementIconClassName?: string;
}

declare const TablePagination: React.ComponentClass<TablePaginationProps>;
export default TablePagination;
