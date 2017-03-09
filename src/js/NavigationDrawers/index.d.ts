import * as React from 'react';
import { Props } from '../index';
import { DrawerTypes, DrawerTypesType, DrawerPositions, MediaTypes } from '../Drawers';

interface NavigationDrawerProps extends Props {
  toolbarStyle?: React.CSSProperties;
  toolbarClassName?: string;
  toolbarTitleStyle?: React.CSSProperties;
  toolbarTitleClassName?: string;
  drawerStyle?: React.CSSProperties;
  drawerClassName?: string;
  contentStyle?: React.CSSProperties;
  contentClassName?: string;
  children?: React.ReactNode;
  includeDrawerHeader?: boolean;
  drawerHeader?: React.ReactNode;
  drawerHeaderChildren?: React.ReactNode;
  drawerTitle?: React.ReactNode;
  drawerChildren?: React.ReactNode;
  position?: DrawerPositions;
  navItems?: Array<React.ReactElement<any> | { divider?: boolean, subheader?: boolean, primaryText?: React.ReactNode }>;
  mobileDrawerType?: 'temporary' | 'temporary-mini';
  tabletDrawerType?: DrawerTypes | DrawerTypesType;
  desktopDrawerType?: DrawerTypes | DrawerTypesType;
  drawerType?: DrawerTypes | DrawerTypesType;
  defaultMedia?: MediaTypes;
  mobileMinWidth?: number;
  tabletMinWidth?: number;
  desktopMinWidth?: number;
  portal?: boolean;
  lastChild?: boolean;
  renderNode?: Object;
  onMediaTypeChange?: (type: DrawerTypesType, media: { mobile: boolean, tablet: boolean, desktop: boolean }) => void;
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibilityToggle?: (visible: boolean, event: Event) => void;
  extractMini?: boolean;
  miniDrawerHeader?: React.ReactNode;
  miniDrawerChildren?: React.ReactNode;
  autoclose?: boolean;
  toolbarTitle?: React.ReactNode;
  toolbarTitleMenu?: React.ReactElement<any>;
  toolbarThemeType?: 'default' | 'colored' | 'themed';
  toolbarSingleColor?: boolean;
  toolbarProminent?: boolean;
  toolbarProminentTitle?: boolean;
  toolbarActions?: React.ReactElement<any> | Array<React.ReactElement<any>>;
  toolbarChildren?: React.ReactNode;
  contentComponent?: Function | string;
  footer?: React.ReactNode;
  temporaryIconChildren?: React.ReactNode;
  temporaryIconClassName?: string;
  persistentIconChildren?: React.ReactNode;
  persistentIconClassName?: string;
  transitionName?: string;
  transitionEnterTimeout?: number;
  transitionLeaveTimeout?: number;
  drawerTransitionDuration?: number;
  contentProps?: Object;
  contentId?: number | string;
  jumpLabel?: string;
}

interface CloseButtonProps extends Props {
}

interface JumpToContentLinkProps extends Props {
}

export default class NavigationDrawer extends React.Component<NavigationDrawerProps, {}> {
  static getCurrentMedia(props?: {
    mobileMinWidth: number,
    tabletMinWidth: number,
    desktopMinWidth: number,
    mobileDrawerType: 'temporary' | 'temporary-mini',
    tabletDrawerType: DrawerTypes | DrawerTypesType,
    desktopDrawerType: DrawerTypes | DrawerTypesType,
  }): { type: DrawerTypesType, mobile: boolean, tablet: boolean, desktop: boolean };
}

export { NavigationDrawer };
export class CloseButton extends React.Component<CloseButtonProps, {}> { }
export class JumpToContentLink extends React.Component<JumpToContentLinkProps, {}> { }
