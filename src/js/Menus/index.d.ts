import * as React from 'react';
import { Props } from '../index';

export enum Positions {
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  CONTEXT,
  BELOW
}

export type PositionsType = 'tl' | 'tr' | 'bl' | 'br' | 'below' | 'context';

interface SharedProps extends Props {
  id?: number | string;
  listId?: number | string;
  listStyle?: React.CSSProperties;
  listClassName?: string;
  component?: Function | string;
  children?: React.ReactElement<any> | Array<React.ReactElement<any>>;
  transitionName?: string;
  transitionEnterTimeout?: number;
  transitionLeaveTimeout?: number;
  toggle?: React.ReactNode;
  position?: Positions | PositionsType;
  onClose: (event?: Event) => void;
  cascading?: boolean;
  contained?: boolean;
  fullWidth?: boolean;
}

interface MenuProps extends SharedProps {
  isOpen: boolean;
}

interface MenuButtonProps extends SharedProps {
  buttonId?: number | string;
  menuStyle?: React.CSSProperties;
  menuClassName?: string;
  buttonChildren?: React.ReactNode;
  onMenuToggle?: (isOpen: boolean, event: Event) => void;
  isOpen?: boolean;
  defaultOpen?: boolean;
}

export default class Menu extends React.Component<MenuProps, {}> {
  static Positions: Positions;
}

export { Menu };
export class MenuButton extends React.Component<MenuButtonProps, {}> { }
