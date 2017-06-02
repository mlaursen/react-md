import * as React from 'react';
export type Positions = 'top' | 'right' | 'bottom' | 'left';

export interface InjectedTooltipProps {
  tooltipLabel?: React.ReactNode;
  tooltipDelay?: number;
  tooltipPosition?: Positions;
  tooltipContainerStyle?: React.CSSProperties;
  tooltipContainerClassName?: string;
  tooltipStyle?: React.CSSProperties;
  tooltipClassName?: string;
  tooltipTransitionEnterTimeout?: number;
  tooltipTransitionLeaveTimeout?: number;
}

export interface TooltippedComponent {
  getComposedComponent(): React.ReactInstance;
}

export default function injectTooltip<P>(
  ComposedComponent: React.ComponentClass<P & { tooltip: React.ReactNode | null }>
): React.ComponentClass<P & InjectedTooltipProps> & TooltippedComponent;
