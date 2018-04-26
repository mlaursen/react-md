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
  onRowToggle?: (rowId: number, checked: boolean, selectedCount: number, event: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
  selectableRows?: boolean;
  indeterminate?: boolean;
  indeterminateIcon?: React.ReactElement<any>;
  checkedIcon?: React.ReactElement<any>;
  uncheckedIcon?: React.ReactElement<any>;
  checkboxHeaderLabel?: string;
  checkboxLabelTemplate?: string | template;
  fixedHeader?: boolean;
  fixedFooter?: boolean;
  fixedDividers?: boolean | { header: boolean; footer: boolean };
  fixedHeight?: number;
  fixedWidth?: number;
  headerHeight?: number;
  footerHeight?: number;
  fullWidth?: boolean;

  /**
   * @deprecated
   */
  uncheckedIconClassName?: string;

  /**
   * @deprecated
   */
  uncheckedIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  checkedIconClassName?: string;

  /**
   * @deprecated
   */
  checkedIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  indeterminateIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  indeterminateIconClassName?: string;
}

declare const DataTable: React.ComponentClass<DataTableProps>;
export default DataTable;
