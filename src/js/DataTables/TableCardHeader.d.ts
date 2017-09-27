import * as React from 'react';
import { Props, IdPropType } from '../index';

export interface TableCardHeaderProps extends Props {
  // for the `component` prop until refactored out
  [key: string]: any;

  component?: React.ReactType;
  transitionName?: string;
  transitionEnterTimeout?: number;
  transitionLeaveTimeout?: number;
  title?: React.ReactNode;
  contextualTitle?: React.ReactNode;
  contextualTitleId?: IdPropType;
  contextualChildren?: React.ReactNode;
  leftChildren?: React.ReactElement<any> | Array<React.ReactElement<any>>;
  children?: React.ReactElement<any> | Array<React.ReactElement<any>>;
  actions?: React.ReactElement<any> | Array<React.ReactElement<any>>;
  noActionsAdjust?: boolean;
  noChildrenAdjust?: boolean;
  noLeftChildrenCline?: boolean;
  visible: boolean;
}

declare const TableCardHeader: React.ComponentClass<TableCardHeaderProps>;
export default TableCardHeader;
