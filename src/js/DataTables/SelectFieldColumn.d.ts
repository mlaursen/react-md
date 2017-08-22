import * as React from 'react';
import { InjectedTooltipProps } from '../Tooltips';
import { SelectFieldProps } from '../SelectFields';
import { HorizontalAnchors, VerticalAnchors, LayoverPositions } from '../Helpers/Layover';

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

interface SelectFieldColumnComponent extends React.ComponentClass<SelectFieldColumnProps> {
  Positions: LayoverPositions;
  HorizontalAnchors: HorizontalAnchors;
  VerticalAnchors: VerticalAnchors;
}

declare const SelectFieldColumn: SelectFieldColumnComponent
export default SelectFieldColumn;
