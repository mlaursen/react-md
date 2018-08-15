import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";

import { Overlay } from "@react-md/overlay";
import { ICSSTransitionProps, CSSTransitionClassNames, TransitionTimeout } from "@react-md/transition";

export type SheetPosition = "top" | "right" | "bottom" | "left";

export interface ISheetProps extends ICSSTransitionProps, React.HTMLAttributes<HTMLDivElement> {
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
}

export interface ISheetDefaultProps {
  overlay: boolean;
  position: SheetPosition;
  timeout: TransitionTimeout;
  mountOnEnter: boolean;
  unmountOnExit: boolean;
  classNames: CSSTransitionClassNames;
}

export type SheetWithDefaultProps = ISheetProps & ISheetDefaultProps;

export default class Sheet extends React.Component<ISheetProps, {}> {
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
