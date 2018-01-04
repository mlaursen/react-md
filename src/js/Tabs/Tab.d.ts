import * as React from 'react';
import { IdPropType, BaseProps } from '../index';

export interface TabProps extends BaseProps {
  // for the `component` prop until refactored out
  [key: string]: any;

  activeClassName?: string;
  inactiveClassName?: string;
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

declare const Tab: React.ComponentClass<TabProps>;
export default Tab;
