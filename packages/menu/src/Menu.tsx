/* eslint-disable jsx-a11y/no-static-element-interactions */
import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from "react";
import cn from "classnames";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
} from "@react-md/portal";
import {
  CSSTransitionComponentProps,
  useFixedPositioning,
  useScaleTransition,
} from "@react-md/transition";
import {
  bem,
  CENTER_CENTER_ANCHOR,
  FixedPositionOptions,
  LabelRequiredForA11y,
  PositionAnchor,
  TOP_INNER_RIGHT_ANCHOR,
} from "@react-md/utils";

import { MenuEvents } from "./MenuEvents";
import { OrientationProvider } from "./Orientation";
import { useMenu } from "./useMenu";

export type MenuPositionOptions = Omit<
  FixedPositionOptions,
  "container" | "element" | "anchor"
>;

export interface BaseMenuProps
  extends HTMLAttributes<HTMLDivElement>,
    CSSTransitionComponentProps,
    RenderConditionalPortalProps {
  /**
   * The id for the menu. This is required for a11y.
   */
  id: string;

  /**
   * The id of the control element that toggles the menu. This is required so
   * that the menu can be positioned to this element and is normally a
   * `<button>`.
   */
  controlId: string;

  /**
   * Boolean if the menu is currently visible.
   */
  visible: boolean;

  /**
   * A function to call that should set the `visible` prop to false.
   */
  onRequestClose: () => void;

  /**
   * The role for the menu. This should normally just be `"menu"`, but I might
   * expand on it to implement the `"listbox"` or other menu like widgets.
   */
  role?: "menu";

  /**
   * The label for the menu. Either this or the `"aria-labelledby"` prop is
   * required for a11y.
   */
  "aria-label"?: string;

  /**
   * The id of an element that acts as a label for the menu. Either this or the
   * `"aria-label"` prop is required for a11y.
   */
  "aria-labelledby"?: string;

  /**
   * The tab index for the menu. This should probably be left at `-1`.
   */
  tabIndex?: number;

  /**
   * The positioning anchor for the menu relative to the button/control that
   * owns the menu.  This is used for the positioning logic as well as modifying
   * the animationg slightly to originate from a coordinate. When this is
   * omitted, it will default to:
   *
   * ```ts
   * const verticalAnchor = {
   *   x: "inner-right",
   *   y: "top",
   * };
   *
   * const horizontalAnchor = {
   *   x: "center",
   *   y: "center",
   * };
   * ```
   */
  anchor?: PositionAnchor;

  /**
   * Optional options to pass down to the `useFixedPositionin` hook styles to
   * change how the menu is fixed to the `MenuButton`.
   */
  positionOptions?: MenuPositionOptions;

  /**
   * Boolean if the menu should be rendered horizontally instead of vertically.
   */
  horizontal?: boolean;

  /**
   * The element that should be focused first when opened. This can either be
   * the first or last focusable item in the menu, or a query selector string to
   * find an element.
   */
  defaultFocus?: "first" | "last" | string;

  /**
   * Boolean if the menu should not be closed when the page is scrolled.
   * Instead, it'll automatically update its position within the viewport. You
   * normally don't want to enable this prop as the menu won't close if the menu
   * control element is no longer in the viewport.
   */
  closeOnScroll?: boolean;

  /**
   * Boolean if the menu should no longer close when the page is resized.
   * Instead, it'll automatically update its position within the viewport.
   */
  closeOnResize?: boolean;

  /**
   * Boolean if the close on outside click logic should consider the control
   * element within the menu and not call the `onRequestClose` function when it
   * is been clicked. This should be enabled when creating a context menu but
   * normally should remain `false` otherwise since the control element has it's
   * own toggle logic that conflicts with this close click.
   */
  disableControlClickOkay?: boolean;
}

export type MenuProps = LabelRequiredForA11y<BaseMenuProps>;

const block = bem("rmd-menu");

/**
 * The `Menu` component is a fully controlled component that will animate in and
 * out based on the `visible` prop as well as handle keyboard focus, closing
 * when needed, etc.
 */
export const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu(
  {
    role = "menu",
    tabIndex = -1,
    controlId,
    style: propStyle,
    className,
    visible,
    onRequestClose,
    children,
    portal = true,
    portalInto,
    portalIntoId,
    temporary = true,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    timeout,
    classNames,
    anchor: propAnchor,
    onClick: propOnClick,
    onKeyDown: propOnKeyDown,
    defaultFocus = "first",
    horizontal = false,
    positionOptions,
    closeOnScroll = false,
    closeOnResize = false,
    disableControlClickOkay = false,
    ...props
  },
  forwardedRef
) {
  let anchor = propAnchor;
  if (!anchor) {
    anchor = horizontal ? CENTER_CENTER_ANCHOR : TOP_INNER_RIGHT_ANCHOR;
  }

  // TODO: Refactor all the menu functionality since I made this when I had no
  // idea what I was doing with hooks
  const {
    ref: nodeRef,
    menuRef,
    onClick,
    onKeyDown,
  } = useMenu({
    ref: forwardedRef,
    visible,
    controlId,
    horizontal,
    onClick: propOnClick,
    onKeyDown: propOnKeyDown,
    portalled: portal || typeof portalInto !== "undefined" || !!portalIntoId,
    defaultFocus,
    onRequestClose,
    disableControlClickOkay,
  });

  const [cancelled, setCancelled] = useState(false);
  const prevVisible = useRef(visible);
  useEffect(() => {
    if (prevVisible.current !== visible) {
      prevVisible.current = visible;
      if (cancelled) {
        setCancelled(false);
      }
    }
  }, [visible, cancelled]);

  const fixedTo = useRef<HTMLElement | null>(null);
  useEffect(() => {
    fixedTo.current = document.getElementById(controlId);
  }, [controlId]);

  const { style, transitionOptions } = useFixedPositioning({
    ...positionOptions,
    nodeRef,
    fixedTo,
    onScroll(_event, { visible }) {
      if (!closeOnScroll && visible) {
        return;
      }

      if (!visible) {
        setCancelled(true);
      }
      onRequestClose();
    },
    onResize: closeOnResize ? onRequestClose : undefined,
    anchor,
    onEnter,
    onEntering,
    onEntered,
    onExited,
    transformOrigin: true,
  });

  const { elementProps, rendered } = useScaleTransition({
    ...transitionOptions,
    appear: temporary,
    className: cn(block({ horizontal }), className),
    onExit,
    onExiting,
    timeout,
    classNames,
    transitionIn: visible,
    temporary,
  });

  const orientation = horizontal ? "horizontal" : "vertical";
  return (
    <ConditionalPortal
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
    >
      {rendered && (
        <OrientationProvider orientation={orientation}>
          <div
            {...props}
            {...elementProps}
            aria-orientation={orientation}
            role={role}
            tabIndex={tabIndex}
            style={{ ...propStyle, ...style }}
            onClick={onClick}
            onKeyDown={onKeyDown}
          >
            {children}
            <MenuEvents
              menuRef={menuRef}
              cancelled={cancelled}
              defaultFocus={defaultFocus}
            />
          </div>
        </OrientationProvider>
      )}
    </ConditionalPortal>
  );
});
