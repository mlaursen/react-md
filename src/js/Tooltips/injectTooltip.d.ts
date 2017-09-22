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

export interface TooltipProps {
  tooltip: React.ReactNode | null;
}

export interface TooltippedComponent {
  getComposedComponent(): React.ReactInstance;
}

export default function injectTooltip<ComposedProps>(
  ComposedComponent: React.ComponentType<ComposedProps & TooltipProps>
): React.ComponentClass<ComposedProps & InjectedTooltipProps> & TooltippedComponent;
