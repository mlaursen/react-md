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

interface MenuProps extends SharedLayoverProps {
  listId?: IdPropType;
  listProps?: {};
  listStyle?: React.CSSProperties;
  listClassName?: string;
  component?: Function | string;
  listInline?: boolean;
  listZDepth?: number;
  listHeightRestricted?: boolean;
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

interface MenuButtonProps extends SharedLayoverProps {
}

export default class Menu extends React.Component<MenuProps, {}> { }
export { Menu };

export class MenuButton extends React.Component<MenuButtonProps, {}> { }
