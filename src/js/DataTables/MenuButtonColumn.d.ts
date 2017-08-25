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

interface MenuButtonColumnComponent extends React.ComponentClass<MenuButtonColumnProps> {
  Positions: LayoverPositions;
  HorizontalAnchors: HorizontalAnchors;
  VerticalAnchors: VerticalAnchors;
}

declare const MenuButtonColumn: MenuButtonColumnComponent;
export default MenuButtonColumn;
