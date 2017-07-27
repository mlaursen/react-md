import * as React from 'react';
import { IdPropType, Props } from '../index';
import { TabProps as Tab } from './Tab';
import { MediaTypes } from '../Drawers';

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

declare const Tabs: React.ComponentClass<TabsProps>;
export default Tabs;
