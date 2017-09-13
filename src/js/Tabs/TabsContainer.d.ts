import * as React from 'react';
import { IdPropType, Props, BaseProps } from '../index';
import { TabsProps as Tabs } from './Tabs';

export interface TabsContainerProps extends Props {
  // for the `component` prop until refactored out
  [key: string]: any;

  panelStyle?: React.CSSProperties;
  panelClassName?: string;
  headerStyle?: React.CSSProperties;
  headerClassName?: string;
  swipeableViewsStyle?: React.CSSProperties;
  swipeableViewsClassName?: string;
  slideStyle?: React.CSSProperties;
  slideClassName?: string;
  children?: React.ReactElement<Tabs>,
  component?: React.ReactType;
  panelComponent?: React.ReactType;
  headerComponent?: React.ReactType;
  toolbar?: React.ReactElement<any>;
  onTabChange?: (activeTabIndex : number, tabId: IdPropType, tabControlsId: number | string, tabChildren: React.ReactNode, event: Event) => void;
  activeTabIndex?: number;
  defaultTabIndex?: number;
  colored?: boolean;
  fixed?: boolean;
  labelAndIcon?: boolean;
  headerZDepth?: number;
  swipeableViewsProps?: Object;
}

declare const TabsContainer: React.ComponentClass<TabsContainerProps>;
export default TabsContainer;
