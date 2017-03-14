import * as React from 'react';
import { IdPropType } from '../index';
import {
  SharedLayoverProps,
  HorizontalAnchors,
  HorizontalAnchorsEnum,
  VerticalAnchors,
  VerticalAnchorsEnum,
  LayoverPositions,
  LayoverPositionsEnum,
  toggleQueryFn,
} from '../Helpers/index';

export interface SharedMenuProps extends SharedLayoverProps {
  listId?: IdPropType;
  listProps?: {};
  listStyle?: React.CSSProperties;
  listClassName?: string;
  listInline?: boolean;
  listZDepth?: number;
  listHeightRestricted?: boolean;
}

interface MenuProps extends SharedMenuProps {
  component?: Function | string;
  visible: boolean;
  children?: React.ReactNode;
  cascading?: boolean;
  cascadingAnchor?: { x: HorizontalAnchors | HorizontalAnchorsEnum, y: VerticalAnchors | VerticalAnchorsEnum };
  cascadingZDepth?: number;
  onContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
  preventContextMenu?: boolean;
  toggleQuery?: string | {} | toggleQueryFn;
  position?: LayoverPositions | LayoverPositionsEnum;
}

interface MenuButtonProps extends SharedMenuProps {
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean, e: React.MouseEvent<HTMLElement>) => void;
  cascading?: boolean;
  cascadingAnchor?: { x: HorizontalAnchors | HorizontalAnchorsEnum, y: VerticalAnchors | VerticalAnchorsEnum };
  cascadingZDepth?: number;
  items?: number | string | {} | React.ReactNode | Array<number | string | {} | React.ReactNode>;
  children?: React.ReactNode;
  position?: LayoverPositions | LayoverPositionsEnum;
}

export default class Menu extends React.Component<MenuProps, {}> { }
export { Menu };

export class MenuButton extends React.Component<MenuButtonProps, {}> { }
