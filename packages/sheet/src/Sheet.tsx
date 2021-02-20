import React, { forwardRef, useCallback, useRef, useState } from "react";
import cn from "classnames";
import { BaseDialogProps, Dialog } from "@react-md/dialog";
import { bem, LabelRequiredForA11y } from "@react-md/utils";

import { DEFAULT_SHEET_CLASSNAMES, DEFAULT_SHEET_TIMEOUT } from "./constants";

type AllowedDialogProps = Omit<
  BaseDialogProps,
  "role" | "type" | "modal" | "forceContainer"
>;

export type SheetPosition = "top" | "right" | "bottom" | "left";
export type SheetHorizontalSize = "none" | "media" | "touch" | "static";
export type SheetVerticalSize = "none" | "touch" | "recommended";

export interface BaseSheetProps extends AllowedDialogProps {
  /**
   * The role that the sheet should be rendered as. You'll normally want to keep
   * this as the default of `"dialog"` unless you are implementing a mobile
   * sheet menu.
   *
   * Note: Setting this to `"menu"` **will not** provide the menu keyboard
   * accessibility automatically.
   */
  role?: "dialog" | "menu" | "none";

  /**
   * The location that the sheet should be located within the viewport.
   */
  position?: SheetPosition;

  /**
   * The size to use for sheets that have been positioned left or right. The
   * default supported values are:
   *
   * - none - the size is based on content, but is still limited to the viewport
   *   width so that the horizontal scrolling will not occur within the page. No
   *   limits added to sizing.
   * - touch - the `min-width` is set to be the entire viewport width minus a
   *   touchable area and `max-width` is set to `20rem` and is normally
   *   recommended for mobile devices.
   * - static - the width is set to a static `16rem` and generally used for
   *   landscape tablets and desktops.
   * - media - automatically switches between "touch" and "static" based on css
   *   media queries. (this is the default)
   */
  horizontalSize?: SheetHorizontalSize;

  /**
   * The size to use for sheets that have been positioned top or bottom. The
   * supported sizes are:
   *
   * - none - the size is based on content and is limited to the viewport
   *   height.
   * - touch - the size is based on content and is limited to the viewport
   *   height with a touchable area to close the sheet.
   * - recommended - the material design recommended sizing that forces a
   *   max-height of 50vh and min-height of 3.5rem
   */
  verticalSize?: SheetVerticalSize;
}

export type SheetProps = LabelRequiredForA11y<BaseSheetProps>;

const block = bem("rmd-sheet");

/**
 * The Sheet component is an extension of the `Dialog` except that it is fixed
 * to the edges of the viewport instead of centered or full page. This component
 * is great for rendering a navigation tree or menus on mobile devices.
 */
export const Sheet = forwardRef<HTMLDivElement, SheetProps>(function Sheet(
  {
    className,
    children,
    visible,
    position = "left",
    horizontalSize = "media",
    verticalSize = "recommended",
    overlay: propOverlay = true,
    overlayClassName,
    role = "dialog",
    component = "div",
    tabIndex = -1,
    appear = false,
    enter = true,
    exit = true,
    onExited,
    hidden: propHidden,
    timeout = DEFAULT_SHEET_TIMEOUT,
    classNames = DEFAULT_SHEET_CLASSNAMES,
    disableTransition = false,
    mountOnEnter = true,
    unmountOnExit = true,
    portal = true,
    overlayHidden = false,
    defaultFocus = "first",
    disableScrollLock = false,
    disableEscapeClose = false,
    disableFocusContainer = false,
    disableNestedDialogFixes = false,
    ...props
  },
  ref
) {
  const horizontal = position === "left" || position === "right";
  const overlay = role !== "none" && propOverlay;

  // if the sheet mounts while not visible and the conditional mounting isn't
  // enabled, need to default to the offscreen state which is normally handled
  // by the CSSTransition's exit state.
  const offscreen = useRef(!visible && !unmountOnExit && !mountOnEnter);
  if (offscreen.current && visible) {
    offscreen.current = false;
  }

  // when sheets are not unmounted on exit, need to set it to hidden so that
  // tabbing no longer focuses any of the elements inside
  const [hidden, setHidden] = useState(!visible && !mountOnEnter);
  if (hidden && visible) {
    setHidden(false);
  }

  const handleExited = useCallback(
    (node: HTMLElement) => {
      if (onExited) {
        onExited(node);
      }

      setHidden(true);
    },
    [onExited]
  );

  return (
    <Dialog
      {...props}
      ref={ref}
      type="custom"
      role={role}
      visible={visible}
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
      hidden={propHidden ?? hidden}
      overlay={overlay}
      overlayClassName={cn("rmd-sheet-overlay", overlayClassName)}
      component={component}
      tabIndex={tabIndex}
      appear={appear}
      enter={enter}
      exit={exit}
      timeout={timeout}
      classNames={classNames}
      disableTransition={disableTransition}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      onExited={handleExited}
      portal={portal}
      overlayHidden={overlayHidden}
      defaultFocus={defaultFocus}
      disableScrollLock={disableScrollLock}
      disableEscapeClose={disableEscapeClose}
      disableFocusContainer={disableFocusContainer}
      disableNestedDialogFixes={disableNestedDialogFixes}
    >
      {children}
    </Dialog>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

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
      hidden: PropTypes.bool,
      component: PropTypes.oneOf(["div", "nav"]),
    };
  } catch (e) {}
}
