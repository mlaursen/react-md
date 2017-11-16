import * as React from 'react';
import { IdPropType } from '../index';
import { BaseMenuProps } from './Menu';
import { HorizontalAnchors, VerticalAnchors, LayoverPositions } from '../Helpers/Layover';

export interface SharedDropdownMenuProps extends BaseMenuProps {
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean, e: React.MouseEvent<HTMLElement>) => void;
  cascading?: boolean;
  cascadingAnchor?: { x: HorizontalAnchors, y: VerticalAnchors };
  cascadingZDepth?: number;
  menuItems?: number | string | {} | React.ReactNode | Array<number | string | {} | React.ReactNode>;
  position?: LayoverPositions;
  simplifiedMenu?: boolean;
}

export interface DropdownMenuProps extends SharedDropdownMenuProps {
  children?: React.ReactElement<any>;
}

export interface DropdownMenuComponent extends React.ComponentClass<DropdownMenuProps> {
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
declare const DropdownMenu: DropdownMenuComponent;
export default DropdownMenu;
