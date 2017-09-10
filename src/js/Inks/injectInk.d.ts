import * as React from 'react';
import { Props } from '../index';

type InteractionTypes = 'keyboard' | 'mouse' | 'touch';

export interface InjectedInkProps extends Props {
  inkStyle?: React.CSSProperties;
  inkClassName?: string;
  inkContainerStyle?: React.CSSProperties;
  inkContainerClassName?: string;
  disabled?: boolean;
  inkDisabled?: boolean;
  inkTransitionOverlay?: number;
  inkTransitionEnterTimeout?: number;
  inkTransitionLeaveTimeout?: number;
  waitForInkTransition?: boolean;
  disabledInteractions?: Array<InteractionTypes>;
}

export interface InkProps {
  ink: React.ReactNode | null;
}

export interface InkedComponent {
  createInk(pageX?: number, pageY?: number): void;
  focus(): void;
  getComposedComponent(): React.ReactInstance;
}

export default function injectInk<ComposedProps>(
  ComposedComponent: React.ComponentType<ComposedProps & InkProps>
): React.ComponentClass<ComposedProps & InjectedInkProps> & InkedComponent;
