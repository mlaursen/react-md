import * as React from 'react';
import { IdPropType } from '../index';
import {
  SharedDrawerProps,
  DrawerType,
  MobileDrawerType,
  DrawerPosition,
  MediaType,
} from '../Drawers';

export interface NavigationDrawerProps extends SharedDrawerProps {
  drawerId?: IdPropType;
  miniDrawerId?: IdPropType;
  navItemsId?: IdPropType;
  miniNavItemsId?: IdPropType;
  toolbarId?: IdPropType;
  contentId?: IdPropType;

  toolbarStyle?: React.CSSProperties;
  toolbarClassName?: string;
  toolbarTitleStyle?: React.CSSProperties;
  toolbarTitleClassName?: string;
  drawerStyle?: React.CSSProperties;
  drawerClassName?: string;
  miniDrawerStyle?: React.CSSProperties;
  miniDrawerClassName?: string;
  miniNavStyle?: React.CSSProperties;
  miniNavClassName?: string;
  contentStyle?: React.CSSProperties;
  contentClassName?: string;
  includeDrawerHeader?: boolean;
  drawerHeader?: React.ReactNode;
  drawerTitle?: React.ReactNode;
  drawerZDepth?: number;
  drawerChildren?: React.ReactNode;
  drawerHeaderChildren?: React.ReactNode;
  mobileDrawerType?: MobileDrawerType;
  tabletDrawerType?: DrawerType;
  desktopDrawerType?: DrawerType;
  drawerType?: DrawerType;
  defaultMedia?: MediaType;
  mobileMinWidth?: number;
  tabletMinWidth?: number;
  desktopMinWidth?: number;
  extractMini?: boolean;
  miniDrawerHeader?: React.ReactNode;
  miniDrawerChildren?: React.ReactNode;
  toolbarTitle?: React.ReactNode;
  toolbarTitleMenu?: React.ReactElement<any>;
  toolbarThemeType?: 'default' | 'colored' | 'themed';
  toolbarSingleColor?: boolean;
  toolbarProminent?: boolean;
  toolbarProminentTitle?: boolean;
  toolbarActions?: React.ReactElement<any> | Array<React.ReactElement<any>>;
  toolbarChildren?: React.ReactNode;
  toolbarZDepth?: number;
  contentComponent?: React.ReactType;
  footer?: React.ReactNode;
  temporaryIcon?: React.ReactElement<any>;
  persistentIcon?: React.ReactElement<any>;
  transitionName?: string;
  transitionEnterTimeout?: number;
  transitionLeaveTimeout?: number;
  drawerTransitionDuration?: number;
  contentProps?: Object;
  jumpLabel?: React.ReactNode;
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

export interface NavigationDrawerComponent extends React.ComponentClass<NavigationDrawerProps> {
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
