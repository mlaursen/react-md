import * as React from 'react';
import { Props } from '../index';
import {
  DrawerTypes,
  DrawerTypesType,
  MobileDrawerTypes,
  MobileDrawerTypesType,
  DrawerPositions,
  MediaTypes,
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
  position?: DrawerPositions;
  navItems?: Array<React.ReactElement<any> | { divider?: boolean, subheader?: boolean, primaryText?: React.ReactNode }>;
  mobileDrawerType?: MobileDrawerTypes | MobileDrawerTypesType;
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
  contentComponent?: Function | string;
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
  getCurrentMedia(props?: {
    mobileMinWidth: number,
    tabletMinWidth: number,
    desktopMinWidth: number,
    mobileDrawerType: MobileDrawerTypes | MobileDrawerTypesType,
    tabletDrawerType: DrawerTypes | DrawerTypesType,
    desktopDrawerType: DrawerTypes | DrawerTypesType,
  }): { type: DrawerTypesType | DrawerTypes, mobile: boolean, tablet: boolean, desktop: boolean };
}

declare const NavigationDrawer: NavigationDrawerComponent;
export default NavigationDrawer;
