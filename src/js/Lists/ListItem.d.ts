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
  // for the `component` prop until refactored out
  [key: string]: any;

  contentStyle?: React.CSSProperties;
  contentClassName?: string;
  leftNodeStyle?: React.CSSProperties;
  leftNodeClassName?: string;
  rightNodeStyle?: React.CSSProperties;
  rightNodeClassName?: string;
  primaryTextStyle?: React.CSSProperties;
  primaryTextClassName?: string;
  secondaryTextStyle?: React.CSSProperties;
  secondaryTextClassName?: string;
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
  activeBoxStyle?: React.CSSProperties;
  activeBoxClassName?: string;
  animateNestedItems?: boolean;
  itemRef?: (ref: React.ReactHTMLElement<any> | null) => null;

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

export interface ListItemComponent extends React.ComponentClass<ListItemProps> {
  focus(): void;
  blur(): void;
}

declare const ListItem: ListItemComponent;
export default ListItem;
