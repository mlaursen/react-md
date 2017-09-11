import * as React from 'react';
import { Props } from '../index';

export type MobileDrawerTypes = {
  // Temporary
  TEMPORARY: 'temporary',
  TEMPORARY_MINI: 'temporary-mini',
}

export type DrawerTypes = {
  // Permanent drawers
  FULL_HEIGHT: 'full-height',
  CLIPPED: 'clipped',
  FLOATING: 'floating',

  // Persistent drawers
  PERSISTENT: 'persistent',
  PERSISTENT_MINI: 'persistent-mini',
} | MobileDrawerTypes;

export type MobileDrawerTypesType = 'temporary' | 'temporary-mini';
export type DrawerTypesType = 'full-height' | 'clipped' | 'floating' | 'persistent' | 'persistent-mini' | MobileDrawerTypesType;

export type MediaTypes = 'mobile' | 'tablet' | 'desktop';
export type DrawerPositions = 'left' | 'right';

export interface DrawerProps extends Props {
  // for the `component` prop until refactored out
  [key: string]: any;

  navStyle?: React.CSSProperties;
  navClassName?: string;
  overlayStyle?: React.CSSProperties;
  overlayClassName?: string;
  component?: React.ReactType;
  navItems?: Array<React.ReactElement<any> | { divider?: boolean, subheader?: boolean, primaryText?: string }>;
  autoclose?: boolean;
  header?: React.ReactNode;
  mobileType?: MobileDrawerTypes | MobileDrawerTypesType;
  mobileMinWidth?: number;
  tabletType?: DrawerTypes | DrawerTypesType;
  tabletMinWidth?: number;
  desktopType?: DrawerTypes | DrawerTypesType;
  desktopMinWidth?: number;
  type?: DrawerTypes;
  onMediaTypeChange?: (type: DrawerTypesType, media: { mobile: boolean, tablet: boolean, desktop: boolean }) => void;
  onVisibilityChange?: (visible: boolean, event: React.MouseEvent<HTMLElement>) => void;
  defaultMedia: MediaTypes;
  overlay?: boolean;
  portal?: boolean;
  renderNode?: Object;
  lastChild?: boolean;
  defaultVisible?: boolean;
  visible?: boolean;
  position?: DrawerPositions;
  inline?: boolean;
  transitionDuration?: number;
  clickableDesktopOverlay?: boolean;
  children?: React.ReactNode;
  constantType?: boolean;

  /**
   * @deprecated
   */
  onVisibilityToggle?: (visible: boolean, event: React.MouseEvent<HTMLElement>) => void;
}

interface DrawerComponent extends React.ComponentClass<DrawerProps> {
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
    mobileType: MobileDrawerTypes | MobileDrawerTypesType,
    tabletType: DrawerTypes | DrawerTypesType,
    desktopType: DrawerTypes | DrawerTypesType,
  }): { type: DrawerTypes | DrawerTypesType, mobile: boolean, tablet: boolean, desktop: boolean };

  matchesMedia(min: number, max?: number): boolean;
}

declare const Drawer: DrawerComponent;
export default Drawer;
