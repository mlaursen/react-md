import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  Fragment,
  forwardRef,
} from "react";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";
import {
  ConditionalPortal,
  IRenderConditionalPortalProps,
  useStaggeredVisibility,
} from "@react-md/portal";
import { Overlay } from "@react-md/overlay";
import { ICSSTransitionProps } from "@react-md/transition";
import { IWithForwardedRef } from "@react-md/utils";

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
import { SHEET_CLASS_NAMES, SHEET_TRANSITION_TIMEOUT } from "./constants";

export interface ISheetProps
  extends HTMLAttributes<HTMLDivElement>,
    ICSSTransitionProps,
    IRenderConditionalPortalProps,
    IWithForwardedRef<HTMLDivElement> {
  /**
   * An id for the sheet. This is required by default since the sheet must behave like one
   * of the a11y roles.
   */
  id: string;

  /**
   * The role for the sheet to behave as.
   */
  role?: "dialog" | "alert" | "alertdialog" | "menu";

  /**
   * The tab index for the sheet. This should normally stay at `-1`.
   */
  tabIndex?: number;

  /**
   * Boolean if the sheet is currently visible.
   */
  visible: boolean;

  /**
   * A function used to close the sheet when the overlay is clicked. This is required so that the
   * sheet can be closed on escape keypress or if the overlay is clicked.
   */
  onRequestClose: () => void;

  /**
   * Boolean if there should be an overlay displayed with the sheet. This is recommended/required
   * on mobile devices.
   */
  overlay?: boolean;

  /**
   * The position for the sheet to be rendered.
   */
  position?: SheetPosition;

  /**
   * The size to use for sheets that have been positioned left or right. The default supported
   * values are:
   * - none - no limits added to sizing. the size will be based on content or custom styles
   * - small - used for mobile devices.
   * - large - used for landscape tablets and desktops.
   * - media - automatically switches between "small" and "large" based on css media queries.
   *     (this is the default)
   */
  horizontalSize?: SheetHorizontalSize;

  /**
   * The size to use for sheets that have been positioned top or bottom. The supported sizes are:
   * - none - the size is based on content and is limited to the viewport height.
   * - touch - the size is based on content and is limited to the viewport height with a touchable
   *     area to close the sheet.
   * - recommended - the material design recommended sizing that forces a max-height of 50vh and
   *     min-height of 3.5rem
   */
  verticalSize?: SheetVerticalSize;

  /**
   * Boolean if the sheet should be updated to have the look-and-feel of being rendered inline with
   * other content on the page instead of directly over everything. This is really just used to
   * lower the box shadow.
   */
  inline?: boolean;
}

type SheetDefaultProps = Required<
  Pick<
    ISheetProps,
    | "role"
    | "tabIndex"
    | "inline"
    | "overlay"
    | "position"
    | "timeout"
    | "mountOnEnter"
    | "unmountOnExit"
    | "classNames"
    | "horizontalSize"
    | "verticalSize"
  >
>;

type SheetWithDefaultProps = ISheetProps & SheetDefaultProps;

const Sheet: FunctionComponent<ISheetProps> = providedProps => {
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
    onExited: propOnExited,
    horizontalSize,
    verticalSize,
    forwardedRef,
    portal,
    portalInto,
    portalIntoId,
    ...props
  } = providedProps as SheetWithDefaultProps;

  const isHorizontal = position === "left" || position === "right";
  let overlayEl: ReactNode = null;
  if (overlay) {
    overlayEl = <Overlay visible={visible} onRequestClose={onRequestClose} />;
  }

  const { portalVisible, onExited } = useStaggeredVisibility({
    onExited: propOnExited,
    visible,
  });

  return (
    <ConditionalPortal
      visible={portalVisible}
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
    >
      <Fragment>
        {overlayEl}
        <CSSTransition
          appear
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
            ref={forwardedRef}
            className={cn(
              "rmd-sheet",
              {
                "rmd-sheet--fixed": !inline,
                "rmd-sheet--horizontal": isHorizontal,
                "rmd-sheet--small-width":
                  isHorizontal && horizontalSize === "small",
                "rmd-sheet--large-width":
                  isHorizontal && horizontalSize === "large",
                "rmd-sheet--media-width":
                  isHorizontal && horizontalSize === "media",
                "rmd-sheet--until-small-width":
                  isHorizontal && horizontalSize === "until-small",
                "rmd-sheet--until-large-width":
                  isHorizontal && horizontalSize === "until-large",
                "rmd-sheet--until-media-width":
                  isHorizontal && horizontalSize === "until-media",
                "rmd-sheet--vertical": !isHorizontal,
                "rmd-sheet--viewport-height":
                  !isHorizontal && verticalSize === "none",
                "rmd-sheet--touchable-height":
                  !isHorizontal && verticalSize === "touch",
                "rmd-sheet--recommended-height":
                  !isHorizontal && verticalSize === "recommended",
                [`rmd-sheet--${position}`]: position !== "calculated",
              },
              className
            )}
          >
            {children}
          </div>
        </CSSTransition>
      </Fragment>
    </ConditionalPortal>
  );
};

const defaultProps: SheetDefaultProps = {
  role: "dialog",
  tabIndex: -1,
  inline: false,
  overlay: true,
  mountOnEnter: true,
  unmountOnExit: true,
  position: "bottom",
  timeout: SHEET_TRANSITION_TIMEOUT,
  classNames: SHEET_CLASS_NAMES,
  horizontalSize: "media",
  verticalSize: "recommended",
};

Sheet.defaultProps = defaultProps;

export default forwardRef<HTMLDivElement, ISheetProps>((props, ref) => (
  <Sheet {...props} forwardedRef={ref} />
));
