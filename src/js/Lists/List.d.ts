import * as React from 'react';
import { Props } from '../index';

export interface ListProps extends Props {
  children?: React.ReactNode;
  ordered?: boolean;
}

export interface ListComponent extends React.ComponentClass<ListProps> {
}

declare const List: ListComponent;
export default List;
