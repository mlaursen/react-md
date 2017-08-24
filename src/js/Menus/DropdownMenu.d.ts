import * as React from 'react';
import { IdPropType } from '../index';
import { BaseMenuProps } from './Menu';
import { HorizontalAnchors, VerticalAnchors, LayoverPositions } from '../Helpers/Layover';

export interface DropdownMenuProps extends BaseMenuProps {
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean, e: React.MouseEvent<HTMLElement>) => void;
  cascading?: boolean;
  cascadingAnchor?: { x: HorizontalAnchors, y: VerticalAnchors };
  cascadingZDepth?: number;
  menuItems?: number | string | {} | React.ReactNode | Array<number | string | {} | React.ReactNode>;
  children?: React.ReactElement<any>;
  position?: LayoverPositions;
  simplifiedMenu?: boolean;
}

interface DropdownMenuComponent extends React.ComponentClass<DropdownMenuProps> {
  Positions: LayoverPositions;
  HorizontalAnchors: HorizontalAnchors;
  VerticalAnchors: VerticalAnchors;
}

declare const DropdownMenu: DropdownMenuComponent;
export default DropdownMenu;
