import * as React from 'react';
import { Props } from '../index';

export interface TableHeaderProps extends Props {
  children?: React.ReactElement<any>;
}

declare const TableHeader: React.ComponentClass<TableHeaderProps>;
export default TableHeader;
