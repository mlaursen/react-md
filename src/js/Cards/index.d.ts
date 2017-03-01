import * as React from 'react';
import { Props, IdPropType } from '../index';
import { Positions } from '../Tooltips';

interface CardProps extends Props {
  defaultExpanded?: boolean;
  raise?: boolean;
  expanded?: boolean;
  onExpanderClick?: Function;
  expanderIconClassName?: string;
  expanderIconChildren?: React.ReactNode;
  expanderTooltipLabel?: string;
  expanderTooltipDelay?: number;
  expanderTooltipPosition?: Positions;
  tableCard?: boolean;
  children?: React.ReactNode;
  animate?: boolean;
}

interface CardActionsProps extends Props {
  expander?: boolean;
  centered?: boolean;
  stacked?: boolean;
  children?: React.ReactNode;
}

interface CardTextProps extends Props {
  component?: Function | string;
  expandable?: boolean;
  children?: React.ReactNode;
}

interface CardTitleProps extends Props {
  id?: IdPropType;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  avatar?: React.ReactElement<any>;
  expander?: boolean;
  children?: React.ReactNode;
}

export default class Card extends React.Component<CardProps, {}> { }
export { Card };
export class CardActions extends React.Component<CardActionsProps, {}> { }
export class CardText extends React.Component<CardTextProps, {}> { }
export class CardTitle extends React.Component<CardTitleProps, {}> { }
