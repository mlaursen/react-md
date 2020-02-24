/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from "react";
import { cnb } from "cnbuilder";
import { RenderConditionalPortalProps } from "@react-md/portal";
import {
  OverridableCSSTransitionProps,
  ScaleTransition,
  useFixedPositioning,
} from "@react-md/transition";
import {
  bem,
  FixedPositionOptions,
  LabelRequiredForA11y,
  PositionAnchor,
} from "@react-md/utils";

import MenuEvents from "./MenuEvents";
import { OrientationProvider } from "./Orientation";
import useMenu from "./useMenu";

export type MenuPositionOptions = Pick<
  FixedPositionOptions,
  | "vwMargin"
  | "vhMargin"
  | "xMargin"
  | "yMargin"
  | "initialX"
  | "initialY"
  | "disableSwapping"
>;

export interface MenuProps
  extends HTMLAttributes<HTMLDivElement>,
    OverridableCSSTransitionProps,
    RenderConditionalPortalProps {
  /**
   * The id for the menu. THis is required for a11y.
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
  disableCloseOnScroll?: boolean;

  /**
   * Boolean if the menu should no longer close when the page is resized.
   * Instead, it'll automatically update its position within the viewport.
   */
  disableCloseOnResize?: boolean;

  /**
   * Boolean if the close on outside click logic should consider the control
   * element within the menu and not call the `onRequestClose` function when it
   * is been clicked. This should be enabled when creating a context menu but
   * normally should remain `false` otherwise since the control element has it's
   * own toggle logic that conflicts with this close click.
   */
  disableControlClickOkay?: boolean;
}

type StrictProps = LabelRequiredForA11y<MenuProps>;

const block = bem("rmd-menu");
const VERTICAL_ANCHOR: PositionAnchor = {
  x: "inner-right",
  y: "top",
};

const HORIZONTAL_ANCHOR: PositionAnchor = {
  x: "center",
  y: "center",
};

/**
 * The `Menu` component is a fully controlled component that will animate in and
 * out based on the `visible` prop as well as handle keyboard focus, closing
 * when needed, etc.
 */
function Menu(
  {
    role = "menu",
    tabIndex = -1,
    controlId,
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
    disableCloseOnScroll = false,
    disableCloseOnResize = false,
    disableControlClickOkay = false,
    ...props
  }: StrictProps,
  forwardedRef?: Ref<HTMLDivElement>
): ReactElement {
  let anchor = propAnchor;
  if (!anchor) {
    anchor = horizontal ? HORIZONTAL_ANCHOR : VERTICAL_ANCHOR;
  }

  const { ref, menuRef, onScroll, onClick, onKeyDown } = useMenu({
    ref: forwardedRef,
    visible,
    controlId,
    horizontal,
    onClick: propOnClick,
    onKeyDown: propOnKeyDown,
    defaultFocus,
    onRequestClose,
    disableCloseOnScroll,
    disableControlClickOkay,
  });

  const {
    style,
    onEnter,
    onEntering,
    onEntered,
    onExited,
  } = useFixedPositioning({
    ...positionOptions,
    fixedTo: () => document.getElementById(controlId),
    onScroll,
    onResize: disableCloseOnResize ? undefined : onRequestClose,
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
          role={role}
          tabIndex={tabIndex}
          style={style}
          ref={ref}
          className={cnb(block({ horizontal }), className)}
          onClick={onClick}
          onKeyDown={onKeyDown}
        >
          {children}
          <MenuEvents menuRef={menuRef} defaultFocus={defaultFocus} />
        </div>
      </OrientationProvider>
    </ScaleTransition>
  );
}

const ForwardedMenu = forwardRef<HTMLDivElement, StrictProps>(Menu);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedMenu.propTypes = {
      id: PropTypes.string.isRequired,
      role: PropTypes.string,
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
      horizontal: PropTypes.bool,
      disableCloseOnScroll: PropTypes.bool,
      disableCloseOnResize: PropTypes.bool,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
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

export default ForwardedMenu;
