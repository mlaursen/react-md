import * as React from 'react';
import { InjectedTooltipProps } from '../Tooltips';
import { SharedSelectFieldProps } from '../SelectFields';
import { HorizontalAnchors, VerticalAnchors, LayoverPositions } from '../Helpers/Layover';

export interface SelectFieldColumnProps extends SharedSelectFieldProps, InjectedTooltipProps {
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

export interface SelectFieldColumnComponent extends React.ComponentClass<SelectFieldColumnProps> {
  Positions: {
    TOP_LEFT: 'tl',
    TOP_RIGHT: 'tr',
    BOTTOM_LEFT: 'bl',
    BOTTOM_RIGHT: 'br',
    BELOW: 'below'
  };
  VerticalAnchors: {
    TOP: 'top',
    CENTER: 'center',
    OVERLAP: 'overlap',
    BOTTOM: 'bottom'
  };
  HorizontalAnchors: {
    LEFT: 'left',
    INNER_LEFT: 'inner left',
    CENTER: 'center',
    RIGHT: 'right',
    INNER_RIGHT: 'inner right'
  };
}

declare const SelectFieldColumn: SelectFieldColumnComponent
export default SelectFieldColumn;
