import * as React from 'react';
import { MenuButtonProps } from '../Menus';
import { HorizontalAnchors, VerticalAnchors, LayoverPositions } from '../Helpers/Layover';
import { Positions } from '../Tooltips';

export interface MenuButtonColumnProps extends MenuButtonProps {
  menuStyle?: React.CSSProperties;
  menuClassName?: string;
  tooltipLabel?: React.ReactNode;
  tooltipDelay?: number;
  tooltipPosition?: Positions;
}

export interface MenuButtonColumnComponent extends React.ComponentClass<MenuButtonColumnProps> {
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

declare const MenuButtonColumn: MenuButtonColumnComponent;
export default MenuButtonColumn;
