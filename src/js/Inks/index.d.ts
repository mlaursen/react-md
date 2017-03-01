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

export interface InkedComponent extends React.Component<{}, {}> {
  createInk(pageX?: number, pageY?: number): void;
  focus(): void;
  getComposedComponent(): React.Component<{}, {}>;
}

type injectInk = (ComposedComponent: React.Component<InjectedInkProps, {}>) => InkedComponent;

export default injectInk;
