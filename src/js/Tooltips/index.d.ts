export type Positions = 'top' | 'right' | 'bottom' | 'left';

export interface InjectedTooltipProps {
  tooltipLabel?: string;
  tooltipDelay?: number;
  tooltipPosition?: Positions;
  tooltipContainerStyle?: React.CSSProperties;
  tooltipContainerClassName?: string;
  tooltipStyle?: React.CSSProperties;
  tooltipClassName?: string;
  tooltipTransitionEnterTimeout?: number;
  tooltipTransitionLeaveTimeout?: number;
}

export interface TooltippedComponent extends React.Component<InjectedTooltipProps, {}> {
  getComposedComponent(): React.Component<{}, {}>;
}

type injectTooltip = (ComposedComponent: React.Component<InjectedTooltipProps, {}>) => React.Component<{}, {}>;

export default injectTooltip;
