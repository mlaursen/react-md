import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

import { Overlay } from "@react-md/overlay";
import { CSSTransition } from "react-transition-group";

export type SheetPosition = "top" | "right" | "bottom" | "left";

// copied from @types. Aren't exported at this time
export type EnterHandler = (node: HTMLElement, isAppearing: boolean) => void;
export type ExitHandler = (node: HTMLElement) => void;

export interface ISheetProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the sheet is currently visible.
   *
   * @docgen
   */
  visible: boolean;

  /**
   * A function used to close the sheet when the overlay is clicked. This is really only required
   * when the `overlay` prop is enabled, but I haven't figured out a way to typedef that in Typescript
   * yet.
   *
   * @docgen
   */
  onRequestClose: () => void;

  /**
   * Boolean if there should be an overlay displayed with the sheet. This is recommended/required on mobile devices.
   *
   * @docgen
   */
  overlay?: boolean;

  /**
   * The position for the sheet to be rendered.
   *
   * @docgen
   */
  position?: SheetPosition;

  /**
   * The class names to use during the different parts of the animation.
   *
   * @docgen
   */
  classNames?: string | CSSTransition.CSSTransitionClassNames;

  /**
   * The transition duration for the overlay. This should not be changed unless you manually change the
   * `$rmd-overlay-transition-duration` scss variable.
   *
   * @docgen
   */
  timeout?: number | { enter?: number; exit?: number };

  /**
   * Pass-down prop to the `Transition` component from react-transition-group. By default, the overlay will
   * not be rendered in the DOM until the `visible` prop is `true` but this can be changed by setting this
   * prop to `false`.
   *
   * @docgen
   */
  mountOnEnter?: boolean;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group. By default, the overlay will
   * be removed from the DOM when the `visible` prop is `false` but this can be changed by setting this
   * prop to `false`.
   *
   * @docgen
   */
  unmountOnExit?: boolean;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group.
   *
   * @docgen
   */
  onEnter?: EnterHandler;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group.
   *
   * @docgen
   */
  onEntering?: EnterHandler;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group.
   *
   * @docgen
   */
  onEntered?: EnterHandler;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group.
   *
   * @docgen
   */
  onExit?: ExitHandler;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group.
   *
   * @docgen
   */
  onExiting?: ExitHandler;

  /**
   * Pass-down prop to the `Transition` component from react-transition-group.
   *
   * @docgen
   */
  onExited?: ExitHandler;
}

export interface ISheetDefaultProps {
  classNames: string | CSSTransition.CSSTransitionClassNames;
  mountOnEnter: boolean;
  unmountOnExit: boolean;
  overlay: boolean;
  position: SheetPosition;
  timeout: number | { enter?: number; exit?: number };
}

export type SheetWithDefaultProps = ISheetProps & ISheetDefaultProps;

export default class Sheet extends React.Component<ISheetProps, void> {
  public static defaultProps: ISheetDefaultProps = {
    overlay: true,
    mountOnEnter: true,
    unmountOnExit: true,
    position: "bottom",
    timeout: {
      enter: 200,
      exit: 150,
    },
    classNames: {
      enter: "rmd-sheet--enter",
      enterActive: "rmd-sheet--enter-active",
      exit: "rmd-sheet--exit",
      exitActive: "rmd-sheet--exit-active",
    },
  };

  public render() {
    const {
      overlay,
      visible,
      timeout,
      onRequestClose,
      position,
      className,
      classNames,
      children,
      mountOnEnter,
      unmountOnExit,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      ...props
    } = this.props as SheetWithDefaultProps;

    return (
      <React.Fragment>
        {overlay && <Overlay visible={visible} onRequestClose={onRequestClose} />}
        <CSSTransition
          appear={true}
          in={visible}
          classNames={classNames}
          timeout={timeout}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
          mountOnEnter={mountOnEnter}
          unmountOnExit={unmountOnExit}
        >
          <div {...props} className={cn(`rmd-sheet rmd-sheet--${position}`, className)}>
            {children}
          </div>
        </CSSTransition>
      </React.Fragment>
    );
  }
}
