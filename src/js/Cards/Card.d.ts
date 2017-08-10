import * as React from 'react';
import { Props } from '../index';
import { Positions } from '../Tooltips';

export interface CardProps extends Props {
  defaultExpanded?: boolean;
  raise?: boolean;
  expanded?: boolean;
  onExpanderClick?: Function;
  expanderIcon?: React.ReactElement<any>;
  expanderTooltipLabel?: React.ReactNode;
  expanderTooltipDelay?: number;
  expanderTooltipPosition?: Positions;
  tableCard?: boolean;
  children?: React.ReactNode;
  animate?: boolean;

  /**
   * @deprecated
   */
  expanderIconClassName?: string;

  /**
   * @deprecated
   */
  expanderIconChildren?: React.ReactNode;
}

declare const Card: React.ComponentClass<CardProps>;
export default Card;
