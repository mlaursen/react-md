import * as React from 'react';
import { Props } from '../index';

export interface TableBodyProps extends Props {
  children?: React.ReactElement<any> | Array<React.ReactElement<any>>;
}

declare const TableBody: React.ComponentClass<TableBodyProps>;
export default TableBody;
