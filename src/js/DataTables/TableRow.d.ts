import * as React from 'react';
import { Props } from '../index';

export interface TableRowProps extends Props {
  children?: Array<React.ReactElement<any>> | React.ReactElement<any> | React.ReactNode;
  onCheckboxClick?: (rowIndex: number, checked: boolean, event: React.MouseEvent<HTMLTableRowElement>) => void;
  selected?: boolean;
  selectable?: boolean;

  /**
   * @deprecated
   */
  autoAdjust?: boolean;
}

declare const TableRow: React.ComponentClass<TableRowProps>;
export default TableRow;
