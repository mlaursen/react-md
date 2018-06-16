import * as React from 'react';
import { Props } from '../index';

export interface CardActionsProps extends Props {
  expander?: boolean;
  centered?: boolean;
  stacked?: boolean;
  children?: React.ReactNode;
}

declare const CardActions: React.ComponentClass<CardActionsProps>;
export default CardActions;
