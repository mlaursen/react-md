import * as React from 'react';
import { Props } from '../index';

export interface ExpansionListProps extends Props {
  component?: React.ReactType;
  children?: React.ReactNode;
  animateContent?: boolean;
}

declare const ExpansionList: React.ComponentClass<ExpansionListProps>;
export default ExpansionList;
