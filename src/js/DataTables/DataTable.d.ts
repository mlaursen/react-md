import * as React from 'react';
import { Props, IdPropType } from '../index';
type template = (rowIndex: number) => string;

export interface DataTableProps extends Props {
  tableStyle?: React.CSSProperties;
  tableClassName?: string;
  fixedWrapperStyle?: React.CSSProperties;
  fixedWrapperClassName?: string;
  fixedScrollWrapperStyle?: React.CSSProperties;
  fixedScrollWrapperClassName?: string;
  baseId?: IdPropType;
  defaultSelectedRows?: Array<boolean>;
  responsive?: boolean;
  plain?: boolean;
  uncheckedIconClassName?: string;
  uncheckedIconChildren?: React.ReactNode;
  checkedIconClassName?: string;
  checkedIconChildren?: React.ReactNode;
  onRowToggle?: (rowId: number, checked: boolean, event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
  selectableRows?: boolean;
  indeterminate?: boolean;
  indeterminateIconChildren?: React.ReactNode;
  indeterminateIconClassName?: string;
  checkboxHeaderLabel?: string;
  checkboxLabelTemplate?: string | template;
  fixedHeader?: boolean;
  fixedFooter?: boolean;
  fixedDividers?: boolean | { header: boolean; footer: boolean };
  fixedHeight?: number;
  fixedWidth?: number;
  headerHeight?: number;
  footerHeight?: number;
}

declare const DataTable: React.ComponentClass<DataTableProps>;
export default DataTable;
