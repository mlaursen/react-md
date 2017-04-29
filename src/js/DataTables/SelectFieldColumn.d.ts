import * as React from 'react';
import { InjectedTooltipProps } from '../Tooltips';
import { SelectFieldProps } from '../SelectFields';

export interface SelectFieldColumnProps extends SelectFieldProps, InjectedTooltipProps {
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

declare const SelectFieldColumn: React.ComponentClass<SelectFieldColumnProps>;
export default SelectFieldColumn;
