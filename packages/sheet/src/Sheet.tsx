import { forwardRef, useEffect, useRef, useState } from "react";
import cn from "classnames";
import type { BaseDialogProps } from "@react-md/dialog";
import { Dialog } from "@react-md/dialog";
import type { LabelRequiredForA11y } from "@react-md/utils";
import { bem } from "@react-md/utils";

import { DEFAULT_SHEET_CLASSNAMES, DEFAULT_SHEET_TIMEOUT } from "./constants";

type AllowedDialogProps = Omit<
  BaseDialogProps,
  "role" | "type" | "modal" | "forceContainer"
>;

/**
 * The location that the sheet should be located within the viewport.
 */
export type SheetPosition = "top" | "right" | "bottom" | "left";

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
export type SheetHorizontalSize = "none" | "media" | "touch" | "static";

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

  /** {@inheritDoc SheetPosition} */
  position?: SheetPosition;
  /** {@inheritDoc SheetHorizontalSize} */
  horizontalSize?: SheetHorizontalSize;
  /** {@inheritDoc SheetVerticalSize} */
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
    temporary = true,
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
  const offscreen = useRef(!visible && !temporary);
  if (offscreen.current && visible) {
    offscreen.current = false;
  }

  // when sheets are not unmounted on exit, need to set it to hidden so that
  // tabbing no longer focuses any of the elements inside
  const [hidden, setHidden] = useState(!visible && !temporary);
  useEffect(() => {
    if (hidden && visible) {
      setHidden(false);
    }
  }, [hidden, visible]);

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
      temporary={temporary}
      onExited={() => {
        onExited?.();
        setHidden(!temporary);
      }}
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
