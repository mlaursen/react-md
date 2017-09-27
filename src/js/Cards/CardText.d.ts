import * as React from 'react';
import { Props } from '../index';

export interface CardTextProps extends Props {
  // for the `component` prop until refactored out
  [key: string]: any;

  component?: React.ReactType;
  expandable?: boolean;
  children?: React.ReactNode;
}

declare const CardText: React.ComponentClass<CardTextProps>;
export default CardText;
