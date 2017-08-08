import * as React from 'react';
import { Props } from '../index';

export interface TablePaginationProps extends Props {
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
