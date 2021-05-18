/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { forwardRef, HTMLAttributes, useRef, useState } from "react";
import cn from "classnames";
import { RenderConditionalPortalProps } from "@react-md/portal";
import {
  OverridableCSSTransitionProps,
  ScaleTransition,
  useFixedPositioning,
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
    OverridableCSSTransitionProps,
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
    portal,
    portalInto,
    portalIntoId,
    mountOnEnter = true,
    unmountOnExit = true,
    onEnter: propOnEnter,
    onEntering: propOnEntering,
    onEntered: propOnEntered,
    onExit,
    onExiting,
    onExited: propOnExited,
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
  const { ref, menuRef, onClick, onKeyDown } = useMenu({
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
  if (prevVisible.current !== visible) {
    prevVisible.current = visible;
    if (cancelled) {
      setCancelled(false);
    }
  }

  const { style, onEnter, onEntering, onEntered, onExited } =
    useFixedPositioning({
      ...positionOptions,
      fixedTo: () => document.getElementById(controlId),
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
      onEnter: propOnEnter,
      onEntering: propOnEntering,
      onEntered: propOnEntered,
      onExited: propOnExited,
      transformOrigin: true,
    });

  const orientation = horizontal ? "horizontal" : "vertical";
  return (
    <ScaleTransition
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
      appear={mountOnEnter}
      visible={visible}
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
      <OrientationProvider orientation={orientation}>
        <div
          {...props}
          aria-orientation={orientation}
          ref={ref}
          role={role}
          tabIndex={tabIndex}
          style={{ ...propStyle, ...style }}
          className={cn(block({ horizontal }), className)}
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
    </ScaleTransition>
  );
});

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    Menu.propTypes = {
      id: PropTypes.string.isRequired,
      role: PropTypes.string,
      className: PropTypes.string,
      controlId: PropTypes.string.isRequired,
      visible: PropTypes.bool.isRequired,
      onRequestClose: PropTypes.func.isRequired,
      "aria-label": PropTypes.string,
      "aria-labelledby": PropTypes.string,
      tabIndex: PropTypes.number,
      anchor: PropTypes.shape({
        x: PropTypes.oneOf([
          "inner-left",
          "inner-right",
          "center",
          "left",
          "right",
        ]),
        y: PropTypes.oneOf(["above", "below", "center", "top", "bottom"]),
      }),
      positionOptions: PropTypes.shape({
        xMargin: PropTypes.number,
        yMargin: PropTypes.number,
        vwMargin: PropTypes.number,
        vhMargin: PropTypes.number,
        disableSwapping: PropTypes.bool,
      }),
      mountOnEnter: PropTypes.bool,
      unmountOnExit: PropTypes.bool,
      defaultFocus: PropTypes.oneOf(["first", "last"]),
      classNames: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          appear: PropTypes.string,
          appearActive: PropTypes.string,
          enter: PropTypes.string,
          enterActive: PropTypes.string,
          exit: PropTypes.string,
          exitActive: PropTypes.string,
        }),
      ]),
      timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
      onClick: PropTypes.func,
      onKeyDown: PropTypes.func,
      children: PropTypes.node,
      horizontal: PropTypes.bool,
      onEnter: PropTypes.func,
      onEntering: PropTypes.func,
      onEntered: PropTypes.func,
      onExit: PropTypes.func,
      onExiting: PropTypes.func,
      onExited: PropTypes.func,
      portal: PropTypes.bool,
      portalInto: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      portalIntoId: PropTypes.string,
      closeOnScroll: PropTypes.bool,
      closeOnResize: PropTypes.bool,
      disableControlClickOkay: PropTypes.bool,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      _a11yValidator: (props, _propName, component) => {
        const label = props["aria-label"];
        const labelledBy = props["aria-labelledby"];
        if (label || labelledBy) {
          return null;
        }

        return new Error(
          `Either the \`aria-label\` or \`aria-labelledby\` props are required for accessibility in the ${component} component, but neither were provided.`
        );
      },
    };
  } catch (e) {}
}
