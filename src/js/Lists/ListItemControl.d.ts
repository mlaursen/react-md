import * as React from 'react';
import { Props } from '../index';
import { BaseListItemProps } from './ListItem';

export interface ListItemControlProps extends BaseListItemProps, Props {
  primaryAction?: React.ReactElement<any>;
  secondaryAction?: React.ReactElement<any>;
}

declare const ListItemControl: React.ComponentClass<ListItemControlProps>;
export default ListItemControl;
