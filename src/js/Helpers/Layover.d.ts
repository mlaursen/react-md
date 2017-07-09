import * as React from 'react';
import { IdPropType, Props } from '../index';

export type toggleQueryFn = () => string;

export type HorizontalAnchors = {
  LEFT: 'left',
  INNER_LEFT: 'inner left',
  CENTER: 'center',
  RIGHT: 'right',
  INNER_RIGHT: 'inner right'
}

export type VerticalAnchors = {
  TOP: 'top',
  CENTER: 'center',
  OVERLAP: 'overlap',
  BOTTOM: 'bottom'
}

export type LayoverPositions =  {
  TOP_LEFT: 'tl',
  TOP_RIGHT: 'tr',
  BOTTOM_LEFT: 'bl',
  BOTTOM_RIGHT: 'br',
  BELOW: 'below'
}

export interface LayoverAnchor {
  x: HorizontalAnchors;
  y: VerticalAnchors;
}

export interface SharedLayoverProps extends Props {
  id?: IdPropType;
  style?: React.CSSProperties;
  className?: string;
  fixedTo?: {} | { x?: {}, y?: {} };
  block?: boolean;
  centered?: boolean;
  fullWidth?: boolean;
  sameWidth?: boolean;
  xThreshold?: number;
  yThreshold?: number;
  transitionName?: string;
  transitionEnterTimeout?: number;
  transitionLeaveTimeout?: number;
  closeOnOutsideClick?: boolean;
  anchor?: LayoverAnchor;
  belowAnchor?: LayoverAnchor;
  repositionOnScroll?: boolean;
}

export interface LayoverProps extends SharedLayoverProps {
  component?: React.ReactType;
  visible: boolean;
  toggle?: React.ReactNode;
  children?: React.ReactElement<any>;
  onClose: Function;
  animationPosition?: LayoverPositions | string;
  onContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
  preventContextMenu?: boolean;
  toggleQuery?: string | {} | toggleQueryFn;
}

interface LayoverComponent extends React.ComponentClass<LayoverProps> {
  Positions: LayoverPositions;
  VerticalAnchors: VerticalAnchors;
  HorizontalAnchors: HorizontalAnchors;
}

declare const Layover: LayoverComponent;
export default Layover;
