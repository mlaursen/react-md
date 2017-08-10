import * as React from 'react';
import { Props } from '../index';
import { InjectedInkProps } from '../Inks';

export interface BaseListItemProps {
  tileStyle?: React.CSSProperties;
  tileClassName?: string;
  secondaryText?: React.ReactNode;
  leftIcon?: React.ReactNode;
  leftAvatar?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightAvatar?: React.ReactNode;
  threeLines?: boolean;
  disabled?: boolean;
  'aria-setsize'?: number;
  'aria-posinset'?: number;
}

export interface ListItemProps extends BaseListItemProps, InjectedInkProps {
  nestedListStyle?: React.CSSProperties;
  nestedListClassName?: string;
  nestedListHeightRestricted?: boolean;
  children?: React.ReactNode;
  tabIndex?: number;
  primaryText: React.ReactNode;
  inset?: boolean;
  component?: React.ReactType;
  itemComponent?: React.ReactType;
  itemProps?: Object;
  nestedItems?: Array<React.ReactNode>;
  defaultVisible?: boolean;
  visible?: boolean;
  expanderIcon?: React.ReactElement<any>;
  expanderLeft?: boolean;
  active?: boolean;
  activeClassName?: string;
  animateNestedItems?: boolean;

  /**
   * @deprecated
   */
  isOpen?: boolean;

  /**
   * @deprecated
   */
  defaultOpen?: boolean;

  /**
   * @deprecated
   */
  expanderIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  expanderIconClassName?: string;
}

interface ListItemComponent extends React.ComponentClass<ListItemProps> {
  focus(): void;
  blur(): void;
}

declare const ListItem: ListItemComponent;
export default ListItem;
