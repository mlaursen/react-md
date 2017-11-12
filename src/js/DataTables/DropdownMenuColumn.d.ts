import * as React from 'react';
import { DropdownMenuProps } from '../Menus';
import { HorizontalAnchors, VerticalAnchors, LayoverPositions } from '../Helpers/Layover';
import { Positions } from '../Tooltips';

export interface DropdownMenuColumnProps extends DropdownMenuProps {
  menuStyle?: React.CSSProperties;
  menuClassName?: string;
  tooltipLabel?: React.ReactNode;
  tooltipDelay?: number;
  tooltipPosition?: Positions;
}

export interface DropdownMenuColumnComponent extends React.ComponentClass<DropdownMenuColumnProps> {
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

declare const DropdownMenuColumn: DropdownMenuColumnComponent;
export default DropdownMenuColumn;
