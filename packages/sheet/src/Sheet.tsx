import React, { FC, forwardRef, useRef } from "react";
import cn from "classnames";
import { Dialog, DialogProps } from "@react-md/dialog";
import { LabelRequiredForA11y, WithForwardedRef, bem } from "@react-md/utils";

type AllowedDialogProps = Omit<
  DialogProps,
  "role" | "type" | "modal" | "forceContainer"
>;

export type SheetPosition = "top" | "right" | "bottom" | "left";
export type SheetHorizontalSize = "none" | "media" | "touch" | "static";
export type SheetVerticalSize = "none" | "touch" | "recommended";

export interface SheetProps extends AllowedDialogProps {
  /**
   * The role that the sheet should be rendered as. You'll normally want to keep this as the
   * default of `"dialog"` unless you are implementing a mobile sheet menu.
   *
   * Note: Setting this to `"menu"` **will not** provide the menu keyboard accessibility
   * automatically.
   */
  role?: "dialog" | "menu" | "none";

  /**
   * The location that the sheet should be located within the viewport.
   */
  position?: SheetPosition;

  /**
   * The size to use for sheets that have been positioned left or right. The default supported
   * values are:
   * - none - the size is based on content, but is still limtied to the viewport width so that the
   *     horizontal scrolling will not occur within the pageno limits added to sizing.
   * - touch - the `min-width` is set to be the entire viewport width minus a touchable area and
   *     `max-width` is set to `20rem` and is normally recommended for mobile devices.
   * - static - the width is set to a static `16rem` and generally used for landscape tablets and desktops.
   * - media - automatically switches between "touch" and "static" based on css media queries.
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
}

type StrictProps = LabelRequiredForA11y<SheetProps>;
type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<
  Pick<
    SheetProps,
    | "role"
    | "component"
    | "position"
    | "horizontalSize"
    | "verticalSize"
    | "overlay"
    | "tabIndex"
    | "appear"
    | "enter"
    | "exit"
    | "timeout"
    | "classNames"
    | "disableTransition"
    | "defaultFocus"
    | "mountOnEnter"
    | "unmountOnExit"
    | "disableScrollLock"
    | "disableEscapeClose"
    | "disableFocusContainer"
    | "disableNestedDialogFixes"
    | "portal"
    | "overlayHidden"
  >
>;
type WithDefaultProps = StrictProps & DefaultProps & WithRef;

const block = bem("rmd-sheet");

/**
 * The Sheet component is an extension of the `Dialog` except that it is fixed to the
 * edges of the viewport instead of centered or full page. This component is great for
 * rendering a navigation tree or menus on mobile devices.
 */
const Sheet: FC<StrictProps & WithRef> = providedProps => {
  const {
    className,
    children,
    position,
    forwardedRef,
    horizontalSize,
    verticalSize,
    overlay: propOverlay,
    overlayClassName,
    ...props
  } = providedProps as WithDefaultProps;
  const { role, visible, mountOnEnter, unmountOnExit } = props;
  const horizontal = position === "left" || position === "right";
  const overlay = role !== "none" && propOverlay;

  // if the sheet mounts while not visible and the conditional mounting isn't enabled,
  // need to default to the offscreen state which is normally handled by the
  // CSSTransition's exit state.
  const offscreen = useRef(!visible && !unmountOnExit && !mountOnEnter);
  if (offscreen.current && visible) {
    offscreen.current = false;
  }

  return (
    <Dialog
      {...props}
      ref={forwardedRef}
      type="custom"
      overlay={overlay}
      overlayClassName={cn("rmd-sheet-overlay", overlayClassName)}
      className={cn(
        block({
          horizontal,
          vertical: !horizontal,
          raised: overlay,
          offscreen: offscreen.current,
          [position]: true,
          [`${horizontalSize}-width`]: horizontal,
          "viewport-height": !horizontal && verticalSize === "none",
          "touchable-height": !horizontal && verticalSize === "touch",
          "recommended-height": !horizontal && verticalSize === "recommended",
        }),
        className
      )}
    >
      {children}
    </Dialog>
  );
};

const defaultProps: DefaultProps = {
  role: "dialog",
  component: "div",
  position: "left",
  horizontalSize: "media",
  verticalSize: "recommended",
  tabIndex: -1,
  appear: false,
  enter: true,
  exit: true,
  timeout: {
    enter: 200,
    exit: 150,
  },
  classNames: {
    appear: "rmd-sheet--offscreen",
    appearActive: "rmd-sheet--enter rmd-sheet--visible",
    enter: "rmd-sheet--offscreen",
    enterActive: "rmd-sheet--enter rmd-sheet--visible",
    exit: "rmd-sheet--exit",
    exitActive: "rmd-sheet--offscreen",
    exitDone: "rmd-sheet--offscreen rmd-sheet--hidden",
  },
  disableTransition: false,
  mountOnEnter: true,
  unmountOnExit: true,
  portal: true,
  overlay: true,
  overlayHidden: false,
  defaultFocus: "first",
  disableScrollLock: false,
  disableEscapeClose: false,
  disableFocusContainer: false,
  disableNestedDialogFixes: false,
};

Sheet.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Sheet.displayName = "Sheet";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Sheet.propTypes = {
      id: PropTypes.string.isRequired,
      "aria-label": PropTypes.string,
      "aria-labelledby": PropTypes.string,
      className: PropTypes.string,
      tabIndex: PropTypes.number,
      visible: PropTypes.bool.isRequired,
      onRequestClose: PropTypes.func.isRequired,
      mountOnEnter: PropTypes.bool,
      unmountOnExit: PropTypes.bool,
      overlay: PropTypes.bool,
      overlayStyle: PropTypes.object,
      overlayClassName: PropTypes.string,
      overlayHidden: PropTypes.bool,
      containerStyle: PropTypes.object,
      containerClassName: PropTypes.string,
      children: PropTypes.node,
      classNames: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          appear: PropTypes.string,
          appearActive: PropTypes.string,
          enter: PropTypes.string,
          enterActive: PropTypes.string,
          enterDone: PropTypes.string,
          exit: PropTypes.string,
          exitActive: PropTypes.string,
          exitDone: PropTypes.string,
        }),
      ]),
      timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
      appear: PropTypes.bool,
      enter: PropTypes.bool,
      exit: PropTypes.bool,
      disableTransition: PropTypes.bool,
      onEnter: PropTypes.func,
      onEntering: PropTypes.func,
      onEntered: PropTypes.func,
      onExit: PropTypes.func,
      onExiting: PropTypes.func,
      onExited: PropTypes.func,
      portal: PropTypes.bool,
      portalInto: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
        PropTypes.object,
      ]),
      portalIntoId: PropTypes.string,
      defaultFocus: PropTypes.oneOfType([
        PropTypes.oneOf(["first", "last"]),
        PropTypes.string,
      ]),
      disableScrollLock: PropTypes.bool,
      disableEscapeClose: PropTypes.bool,
      disableFocusContainer: PropTypes.bool,
      disableNestedDialogFixes: PropTypes.bool,
      position: PropTypes.oneOf(["top", "right", "bottom", "left"]),
      horizontalSize: PropTypes.oneOf(["none", "media", "touch", "static"]),
      verticalSize: PropTypes.oneOf(["none", "touch", "recommended"]),
      role: PropTypes.oneOf(["dialog", "menu", "none"]),
      component: PropTypes.oneOf(["div", "nav"]),
    };
  }
}

export default forwardRef<HTMLDivElement, StrictProps>((props, ref) => (
  <Sheet {...props} forwardedRef={ref} />
));
