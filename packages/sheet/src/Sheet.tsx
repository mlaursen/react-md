import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";

import { Overlay } from "@react-md/overlay";
import {
  ICSSTransitionProps,
  CSSTransitionClassNames,
  TransitionTimeout,
} from "@react-md/transition";

export type SheetPosition = "calculated" | "top" | "right" | "bottom" | "left";
export type SheetHorizontalSize =
  | "none"
  | "media"
  | "small"
  | "large"
  | "until-small"
  | "until-large"
  | "until-media";
export type SheetVerticalSize = "none" | "touch" | "recommended";

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

  /**
   * The size to use for sheets that have been positioned left or right. The default supported values are:
   * - none - no limits added to sizing. the size will be based on content or custom styles
   * - small - used for mobile devices.
   * - large - used for landscape tablets and desktops.
   * - media - automatically switches between "small" and "large" based on css media queries. (this is the default)
   *
   * @docgen
   */
  horizontalSize?: SheetHorizontalSize;

  /**
   * The size to use for sheets that have been positioned top or bottom. The supported sizes are:
   * - none - the size is based on content and is limited to the viewport height.
   * - touch - the size is based on content and is limited to the viewport height with a touchable area to close the
   * sheet.
   * - recommended - the material design recommended sizing that forces a max-height of 50vh and min-height of 3.5rem
   *
   * @docgen
   */
  verticalSize?: SheetVerticalSize;

  /**
   * Boolean if the sheet should be updated to have the look-and-feel of being rendered inline with other content on the
   * page instead of directly over everything. This is really just used to lower the box shadow.
   *
   * @docgen
   */
  inline?: boolean;
}

export interface ISheetDefaultProps {
  inline: boolean;
  overlay: boolean;
  position: SheetPosition;
  timeout: TransitionTimeout;
  mountOnEnter: boolean;
  unmountOnExit: boolean;
  classNames: CSSTransitionClassNames;
  horizontalSize: SheetHorizontalSize;
  verticalSize: SheetVerticalSize;
}

export type SheetWithDefaultProps = ISheetProps & ISheetDefaultProps;

export default class Sheet extends React.Component<ISheetProps, {}> {
  public static defaultProps: ISheetDefaultProps = {
    inline: false,
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
    horizontalSize: "media",
    verticalSize: "recommended",
  };

  public render() {
    const {
      inline,
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
      horizontalSize,
      verticalSize,
      ...props
    } = this.props as SheetWithDefaultProps;

    const isHorizontal = position === "left" || position === "right";

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
          <div
            {...props}
            className={cn(
              "rmd-sheet",
              {
                "rmd-sheet--fixed": !inline,
                "rmd-sheet--small-width": isHorizontal && horizontalSize === "small",
                "rmd-sheet--large-width": isHorizontal && horizontalSize === "large",
                "rmd-sheet--media-width": isHorizontal && horizontalSize === "media",
                "rmd-sheet--until-small-width": isHorizontal && horizontalSize === "until-small",
                "rmd-sheet--until-large-width": isHorizontal && horizontalSize === "until-large",
                "rmd-sheet--until-media-width": isHorizontal && horizontalSize === "until-media",
                "rmd-sheet--viewport-height": !isHorizontal && verticalSize === "none",
                "rmd-sheet--touchable-height": !isHorizontal && verticalSize === "touch",
                "rmd-sheet--recommended-height": !isHorizontal && verticalSize === "recommended",
                [`rmd-sheet--${position}`]: position !== "calculated",
              },
              className
            )}
          >
            {children}
          </div>
        </CSSTransition>
      </React.Fragment>
    );
  }
}
