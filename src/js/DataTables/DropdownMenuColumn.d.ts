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

interface DropdownMenuColumnComponent extends React.ComponentClass<DropdownMenuColumnProps> {
  Positions: LayoverPositions;
  HorizontalAnchors: HorizontalAnchors;
  VerticalAnchors: VerticalAnchors;
}

declare const DropdownMenuColumn: DropdownMenuColumnComponent;
export default DropdownMenuColumn;
