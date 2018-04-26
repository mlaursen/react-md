import * as React from 'react';
import { IdPropType, Props } from '../index';

export type toggleQueryFn = () => string;

export type HorizontalAnchors = 'inner left' | 'left' | 'center' | 'right' | 'inner right';

export type VerticalAnchors = 'top' | 'center' | 'overlap' | 'bottom';

export type LayoverPositions = 'tl' | 'tr' | 'bl' | 'br' | 'below';

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
  repositionOnResize?: boolean;
  minLeft?: number | string;
  minRight?: number | string;
  minBottom?: number | string;
  fillViewportHeight?: boolean;
  fillViewportWidth?: boolean;
}

export interface LayoverProps extends SharedLayoverProps {
  // for the `component` prop until refactored out
  [key: string]: any;

  component?: React.ReactType;
  visible: boolean;
  toggle?: React.ReactNode;
  children?: React.ReactElement<any>;
  onClose: Function;
  animationPosition?: LayoverPositions | string;
  onContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
  preventContextMenu?: boolean;
  toggleQuery?: string | {} | toggleQueryFn;
  simplified?: boolean;
}

export interface LayoverComponent extends React.ComponentClass<LayoverProps> {
  Positions: {
    TOP_LEFT: 'tl',
    TOP_RIGHT: 'tr',
    BOTTOM_LEFT: 'bl',
    BOTTOM_RIGHT: 'br',
    BELOW: 'below'
  };
  VerticalAnchors: {
    TOP: 'top',
    CENTER: 'center',
    OVERLAP: 'overlap',
    BOTTOM: 'bottom'
  };
  HorizontalAnchors: {
    LEFT: 'left',
    INNER_LEFT: 'inner left',
    CENTER: 'center',
    RIGHT: 'right',
    INNER_RIGHT: 'inner right'
  };
}

declare const Layover: LayoverComponent;
export default Layover;
