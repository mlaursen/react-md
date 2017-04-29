import * as React from 'react';
import { Props } from '../index';

export interface ListProps extends Props {
  children?: React.ReactNode;
  ordered?: boolean;
}

declare const List: React.ComponentClass<ListProps>;
export default List;
