import * as React from 'react';
import { Props } from '../index';
import { InjectedInkProps } from '../Inks';

interface ListProps extends Props {
  children?: React.ReactNode;
  ordered?: boolean;
}

interface ListItemProps extends InjectedInkProps {
  tileStyle?: React.CSSProperties;
  tileClassName?: string;
  children?: React.ReactNode;
  tabIndex?: number;
  primaryText: React.ReactNode;
  secondaryText?: React.ReactNode;
  inset?: boolean;
  leftIcon?: React.ReactNode;
  leftAvatar?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightAvatar?: React.ReactNode;
  threeLines?: boolean;
  component?: Function | string;
  nestedItems?: Array<React.ReactNode>;
  defaultOpen?: boolean;
  isOpen?: boolean;
  expanderIconChildren?: React.ReactNode;
  expanderIconClassName?: string;
  active?: boolean;
  activeClassName?: string;
}

interface ListItemControlProps extends Props {
  tileStyle?: React.CSSProperties;
  tileClassName?: string;
  primaryText?: React.ReactNode;
  secondaryText?: React.ReactNode;
  threeLines?: boolean;
  primaryAction?: React.ReactElement<any>;
  seconaryAction?: React.ReactElement<any>;
  leftIcon?: React.ReactNode;
  leftAvatar?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightAvatar?: React.ReactNode;
}

export default class List extends React.Component<ListProps, {}> { }
export { List };
export class ListItem extends React.Component<ListItemProps, {}> {
  focus(): void;
  blur(): void;
}
export class ListItemControl extends React.Component<ListItemControlProps, {}> { }
