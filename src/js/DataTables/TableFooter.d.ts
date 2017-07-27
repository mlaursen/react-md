import * as React from 'react';
import { Props } from '../index';

export interface TableFooterProps extends Props {
  children?: React.ReactElement<any>;
}

declare const TableFooter: React.ComponentClass<TableFooterProps>;
export default TableFooter;
