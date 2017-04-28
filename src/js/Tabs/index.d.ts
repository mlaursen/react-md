import * as React from 'react';
import { IdPropType, Props, BaseProps } from '../index';
import { MediaTypes } from '../Drawers';

export interface TabsContainerProps extends Props {
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
  onTabChange?: (activeTabIndex : number, tabId: number | string, tabControlsId: number | string, tabChildren: React.ReactNode, event: Event) => void;
  activeTabIndex?: number;
  defaultTabIndex?: number;
  colored?: boolean;
  fixed?: boolean;
  labelAndIcon?: boolean;
  headerZDepth?: number;
  swipeableViewsProps?: Object;
}

export interface TabsProps extends Props {
  tabId: IdPropType;
  component?: React.ReactType;
  children?: React.ReactElement<Tab> | Array<React.ReactElement<Tab>>;
  centered?: boolean;
  alignToKeyline?: boolean;
  colored?: boolean;
  overflowMenu?: boolean;
  onTabChange?: (
    activeTabIndex : number,
    tabId: IdPropType,
    tabControlsId: IdPropType,
    tabChildren: React.ReactNode,
    event: Event
  ) => void;
  activeTabIndex?: number;
  defaultTabIndex?: number;
  defaultMedia?: MediaTypes;
  desktopMinWidth?: number;
  nextIconChildren?: React.ReactNode;
  nextIconClassName?: string;
  previousIconChildren?: React.ReactNode;
  previousIconClassName?: string;
  overflowMenuLabel?: React.ReactNode;
  overflowMenuIconChildren?: React.ReactNode;
  overflowMenuIconClassName?: string;
}

export interface TabProps extends BaseProps {
  id?: IdPropType;
  controlsId?: IdPropType;
  component?: React.ReactType;
  children?: React.ReactNode;
  icon?: React.ReactElement<any>;
  label?: React.ReactNode;
  onClick?: (index: number, id: IdPropType, controlsId: IdPropType, children: React.ReactNode, event: Event) => void;
  active?: boolean;
  index?: number;
}

export interface TabPanelProps extends Props {
  id: IdPropType;
  contolledById: IdPropType;
  component?: React.ReactType;
  active?: boolean;
  children?: React.ReactNode;
}

export interface MenuTabProps extends Props {
  id: IdPropType;
  activeTabIndex: number;
  overflowAtIndex: number;
  tabs: Array<React.ReactElement<Tab> | string | { divider?: boolean, subheader?: boolean, primaryText?: string }>
  tabStyle?: React.CSSProperties;
  tabClassName?: string;
  label: React.ReactNode;
}

export default class TabsContainer extends React.Component<TabsContainerProps, {}> { }
export { TabsContainer };
export class Tabs extends React.Component<TabsProps, {}> { }
export class Tab extends React.Component<TabProps, {}> { }
export class TabPanel extends React.Component<TabPanelProps, {}> { }
export class MenuTab extends React.Component<MenuTabProps, {}> { }
