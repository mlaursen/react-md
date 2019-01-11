// these were copied from @types/react-transition-group and renamed to be prefixed with Transition
// since they currently aren't exported
export type TransitionEnterHandler = (
  node: HTMLElement,
  isAppearing: boolean
) => void;
export type TransitionExitHandler = (node: HTMLElement) => void;

export type TransitionTimeout = number | { enter?: number; exit?: number };

// this was copied over just for simplicity and not requiring adding react-transition-group for this
export interface ICSSTransitionClassNames {
  appear?: string;
  appearActive?: string;
  enter?: string;
  enterActive?: string;
  enterDone?: string;
  exit?: string;
  exitActive?: string;
  exitDone?: string;
}

export type CSSTransitionClassNames = string | ICSSTransitionClassNames;

export interface ITransitionProps {
  /**
   * The transition duration for the overlay. This should not be changed unless you manually change the
   * `$rmd-overlay-transition-duration` scss variable.
   */
  timeout?: TransitionTimeout;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group. By default, the overlay will
   * not be rendered in the DOM until the `visible` prop is `true` but this can be changed by setting this
   * prop to `false`.
   */
  mountOnEnter?: boolean;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group. By default, the overlay will
   * be removed from the DOM when the `visible` prop is `false` but this can be changed by setting this
   * prop to `false`.
   */
  unmountOnExit?: boolean;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group.
   */
  onEnter?: TransitionEnterHandler;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group.
   */
  onEntering?: TransitionEnterHandler;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group.
   */
  onEntered?: TransitionEnterHandler;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group.
   */
  onExit?: TransitionExitHandler;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group.
   */
  onExiting?: TransitionExitHandler;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group.
   */
  onExited?: TransitionExitHandler;
}

export interface ICSSTransitionProps extends ITransitionProps {
  /**
   * The class names to use during the different parts of the animation.
   */
  classNames?: CSSTransitionClassNames;
}
