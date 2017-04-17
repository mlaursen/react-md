import * as React from 'react';
import { Props, IdPropType } from '../index';
import { InjectedTooltipProps } from '../Tooltips';
import { TextFieldTypes } from '../TextFields';
import { SharedLayoverProps, LayoverPositions, LayoverPositionsEnum } from '../Helpers';
import { SelectFieldProps } from '../SelectFields';

type template = (rowIndex: number) => string;

interface DataTableProps extends Props {
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

interface TableHeaderProps extends Props {
  children?: React.ReactElement<any>;
}

interface TableBodyProps extends Props {
  children?: React.ReactElement<any> | Array<React.ReactElement<any>>;
}

interface TableRowProps extends Props {
  children?: Array<React.ReactElement<any>> | React.ReactElement<any>;
  onCheckboxClick?: (rowIndex: number, event: React.MouseEvent<HTMLTableRowElement>) => void;
  selected?: boolean;
  selectable?: boolean;

  /**
   * @deprecated
   */
  autoAdjust?: boolean;
}

interface TableColumnProps extends Props, InjectedTooltipProps {
  fixedStyle?: React.CSSProperties;
  fixedClassName?: string;
  sorted?: boolean;
  sortIconChildren?: React.ReactNode;
  sortIconClassName?: string;
  numeric?: boolean;
  adjusted?: boolean;
  grow?: boolean;
  selectColumnHeader?: boolean;
  header?: boolean;
  children?: React.ReactNode;
  plain?: boolean;
  scope?: 'row' | 'col';
  cellIndex?: boolean;
}

interface EditDialogColumnProps extends SharedLayoverProps, InjectedTooltipProps {
  dialogId?: IdPropType;
  layoverStyle?: React.CSSProperties;
  layoverClassName?: string;
  dialogStyle?: React.CSSProperties;
  dialogClassName?: string;
  dialogContentStyle?: React.CSSProperties;
  dialogContentClassName?: string;
  textFieldStyle?: React.CSSProperties;
  textFieldClassName?: string;
  inputStyle?: React.CSSProperties;
  inputClassName?: string;
  disabled?: boolean;
  inline?: boolean;
  value?: number | string;
  defaultValue?: number | string;
  onChange?: (value: number | string, event: React.FormEvent<HTMLElement>) => void;
  label?: string;
  placeholder?: string;
  large?: boolean;
  title?: React.ReactNode;
  maxLength?: number;
  inlineIconChildren?: React.ReactNode;
  inlineIconClassName?: string;
  noIcon?: boolean;
  onOkClick?: (value: number | string, event: React.MouseEvent<HTMLElement>) => void;
  okLabel?: React.ReactNode;
  okPrimary?: boolean;
  okSecondary?: boolean;
  onCancelClick?: (value: number | string, event: React.MouseEvent<HTMLElement>) => void;
  cancelLabel?: React.ReactNode;
  cancelPrimary?: boolean;
  cancelSecondary?: boolean;
  okOnOutsideClick?: boolean;
  onOutsideClick?: (event: React.MouseEvent<HTMLElement>) => void;
  closeOnOutsideClick?: boolean;
  type?: TextFieldTypes;
  animationPosition?: LayoverPositions | LayoverPositionsEnum;

  header?: boolean;
  cellIndex?: number;

  /**
   * @deprecated
   */
  enforceMinWidth?: boolean;

  /**
   * @deprecated
   */
  scrollThreshold?: number;

  /**
   * @deprecated
   */
  transitionDuration?: number;
}

interface SelectFieldColumnProps extends SelectFieldProps, InjectedTooltipProps {
  menuStyle?: React.CSSProperties;
  menuClassName?: string;
  header?: boolean;
  cellIndex?: number;

  /**
   * @deprecated
   */
  scrollThreshold?: number;

  /**
   * @deprecated
   */
  wrapperStyle?: React.CSSProperties;

  /**
   * @deprecated
   */
  wrapperClassName?: string;
}

interface TablePaginationProps extends Props {
  onPagination: (startIndex: number, rowsPerPage: number, currentPage: number) => void;
  rowsPerPage?: number;
  page?: number;
  defaultPage?: number;
  defaultRowsPerPage?: number;
  rowsPerPageLabel?: React.ReactNode;
  rowsPerPageItems?: Array<number>;
  rows: number;
  incrementIconChildren?: React.ReactNode;
  incrementIconClassName?: string;
  decrementIconChildren?: React.ReactNode;
  decrementIconClassName?: string;
}

interface TableFooterProps extends Props {
  children?: React.ReactNode;
}

export default class DataTable extends React.Component<DataTableProps, {}> { }
export { DataTable };

export class TableHeader extends React.Component<TableHeaderProps, {}> { }
export class TableBody extends React.Component<TableBodyProps, {}> { }
export class TableRow extends React.Component<TableRowProps, {}> { }
export class TableColumn extends React.Component<TableColumnProps, {}> { }
export class EditDialogColumn extends React.Component<EditDialogColumnProps, {}> { }
export class SelectFieldColumn extends React.Component<SelectFieldColumnProps, {}> { }
export class TablePagination extends React.Component<TablePaginationProps, {}> { }
export class TableFooter extends React.Component<TableFooterProps, {}> { }
