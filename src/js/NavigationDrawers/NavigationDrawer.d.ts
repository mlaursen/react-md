import * as React from 'react';
import { Props } from '../index';
import {
  DrawerType,
  MobileDrawerType,
  DrawerPosition,
  MediaType,
} from '../Drawers';

export interface NavigationDrawerProps extends Props {
  toolbarStyle?: React.CSSProperties;
  toolbarClassName?: string;
  toolbarTitleStyle?: React.CSSProperties;
  toolbarTitleClassName?: string;
  drawerStyle?: React.CSSProperties;
  drawerClassName?: string;
  contentStyle?: React.CSSProperties;
  contentClassName?: string;
  overlayStyle?: React.CSSProperties;
  overlayClassName?: string;
  children?: React.ReactNode;
  includeDrawerHeader?: boolean;
  drawerHeader?: React.ReactNode;
  drawerHeaderChildren?: React.ReactNode;
  drawerTitle?: React.ReactNode;
  drawerChildren?: React.ReactNode;
  position?: DrawerPosition;
  navItems?: Array<React.ReactElement<any> | { divider?: boolean, subheader?: boolean, primaryText?: React.ReactNode }>;
  mobileDrawerType?: MobileDrawerType;
  tabletDrawerType?: DrawerType;
  desktopDrawerType?: DrawerType;
  drawerType?: DrawerType;
  defaultMedia?: MediaType;
  mobileMinWidth?: number;
  tabletMinWidth?: number;
  desktopMinWidth?: number;
  portal?: boolean;
  lastChild?: boolean;
  renderNode?: Object;
  onMediaTypeChange?: (type: DrawerType, media: { mobile: boolean, tablet: boolean, desktop: boolean }) => void;
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean, event: Event) => void;
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
  contentComponent?: React.ReactType;
  footer?: React.ReactNode;
  transitionName?: string;
  transitionEnterTimeout?: number;
  transitionLeaveTimeout?: number;
  drawerTransitionDuration?: number;
  contentProps?: Object;
  contentId?: number | string;
  jumpLabel?: string;
  temporaryIcon?: React.ReactElement<any>;
  persistentIcon?: React.ReactElement<any>;
  constantDrawerType?: boolean;

  /**
   * @deprecated
   */
  onVisibilityToggle?: (visible: boolean, event: Event) => void;

  /**
   * @deprecated
   */
  temporaryIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  temporaryIconClassName?: string;

  /**
   * @deprecated
   */
  persistentIconChildren?: React.ReactNode;

  /**
   * @deprecated
   */
  persistentIconClassName?: string;
}

interface NavigationDrawerComponent extends React.ComponentClass<NavigationDrawerProps> {
  DrawerTypes: {
    // Permanent drawers
    FULL_HEIGHT: 'full-height',
    CLIPPED: 'clipped',
    FLOATING: 'floating',

    // Persistent drawers
    PERSISTENT: 'persistent',
    PERSISTENT_MINI: 'persistent-mini',

    // Temporary
    TEMPORARY: 'temporary',
    TEMPORARY_MINI: 'temporary-mini',
  };
  getCurrentMedia(props?: {
    mobileMinWidth: number,
    tabletMinWidth: number,
    desktopMinWidth: number,
    mobileDrawerType: MobileDrawerType,
    tabletDrawerType: DrawerType,
    desktopDrawerType: DrawerType,
  }): { type: DrawerType, mobile: boolean, tablet: boolean, desktop: boolean };
}

declare const NavigationDrawer: NavigationDrawerComponent;
export default NavigationDrawer;
