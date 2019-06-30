import React, { FC, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
} from "@react-md/portal";
import { bem } from "@react-md/theme";
import { CSSTransitionProps, useFixedPositioning } from "@react-md/transition";
import {
  FixedPositionOptions,
  LabelRequiredForA11y,
  PositionAnchor,
  WithForwardedRef,
} from "@react-md/utils";

import MenuEvents from "./MenuEvents";
import { OrientationProvider } from "./Orientation";
import useMenu from "./useMenu";

export interface MenuProps
  extends HTMLAttributes<HTMLDivElement>,
    CSSTransitionProps,
    RenderConditionalPortalProps {
  /**
   * The id for the menu. THis is required for a11y.
   */
  id: string;

  /**
   * The id of the control element that toggles the menu. This is required so that the menu can
   * be positioned to this element and is normally a `<button>`.
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
   * The label for the menu. Either this or the `"aria-labelledby"` prop is required for a11y.
   */
  "aria-label"?: string;

  /**
   * The id of an element that acts as a label for the menu. Either this or the `"aria-label"` prop
   * is required for a11y.
   */
  "aria-labelledby"?: string;

  /**
   * The tab index for the menu. This should probably be left at `-1`.
   */
  tabIndex?: number;

  /**
   * The positioning anchor for the menu relative to the button/control that owns the menu.
   * This is used for the positioning logic as well as modifying the animationg slightly to
   * originate from a coordinate. When this is omitted, it will default to:
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
   * Optional options to pass down to the `useFixedPositionin` hook styles to change how the
   * menu is fixed to the `MenuButton`.
   */
  positionOptions?: Pick<
    FixedPositionOptions,
    "vwMargin" | "vhMargin" | "xMargin" | "yMargin" | "disableSwapping"
  >;

  /**
   * Boolean if the menu should be rendered horizontally instead of vertically.
   */
  horizontal?: boolean;

  /**
   * The element that should be focused first when opened. This can either be the first or last
   * focusable item in the menu, or a query selector string to find an element.
   */
  defaultFocus?: "first" | "last" | string;

  /**
   * Boolean if the menu should not be closed when the page is scrolled. Instead,
   * it'll automatically update its position within the viewport. You normally don't
   * want to enable this prop as the menu won't close if the menu control element
   * is no longer in the viewport.
   */
  disableCloseOnScroll?: boolean;

  /**
   * Boolean if the menu should no longer close when the page is resized. Instead,
   * it'll automatically update its position within the viewport.
   */
  disableCloseOnResize?: boolean;
}

type StrictProps = LabelRequiredForA11y<MenuProps>;
type WithRef = WithForwardedRef<HTMLDivElement>;
type DefaultProps = Required<
  Pick<
    MenuProps,
    | "role"
    | "horizontal"
    | "tabIndex"
    | "classNames"
    | "timeout"
    | "mountOnEnter"
    | "unmountOnExit"
    | "defaultFocus"
    | "disableCloseOnScroll"
    | "disableCloseOnResize"
  >
>;
type WithDefaultProps = MenuProps & DefaultProps & WithRef;

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
 * The `Menu` component is a fully controlled component that will animate
 * in and out based on the `visible` prop as well as handle keyboard focus,
 * closing when needed, etc.
 */
const Menu: FC<StrictProps & WithRef> = providedProps => {
  const {
    controlId,
    className,
    visible,
    onRequestClose,
    forwardedRef,
    children,
    portal,
    portalInto,
    portalIntoId,
    mountOnEnter,
    unmountOnExit,
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
    disableCloseOnScroll,
    disableCloseOnResize,
    defaultFocus,
    horizontal,
    positionOptions,
    ...props
  } = providedProps as WithDefaultProps;

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
    onRequestClose,
    disableCloseOnScroll,
  });

  const { style, ...transitionHandlers } = useFixedPositioning({
    ...positionOptions,
    fixedTo: () => document.getElementById(controlId),
    onScroll,
    onResize: disableCloseOnResize ? undefined : onRequestClose,
    anchor,
    onEnter,
    onEntering,
    onEntered,
    onExited,
    transformOrigin: true,
  });

  const orientation = horizontal ? "horizontal" : "vertical";
  return (
    <ConditionalPortal
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
    >
      <CSSTransition
        appear={mountOnEnter}
        in={visible}
        classNames={classNames}
        timeout={timeout}
        {...transitionHandlers}
        onExit={onExit}
        onExiting={onExiting}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
      >
        <OrientationProvider orientation={orientation}>
          <div
            {...props}
            aria-orientation={orientation}
            style={style}
            ref={ref}
            className={cn(block({ horizontal }), className)}
            onClick={onClick}
            onKeyDown={onKeyDown}
          >
            {children}
            <MenuEvents menuRef={menuRef} defaultFocus={defaultFocus} />
          </div>
        </OrientationProvider>
      </CSSTransition>
    </ConditionalPortal>
  );
};

const defaultProps: DefaultProps = {
  role: "menu",
  tabIndex: -1,
  mountOnEnter: true,
  unmountOnExit: true,
  defaultFocus: "first",
  classNames: {
    appear: "rmd-menu--enter",
    appearActive: "rmd-menu--enter-active",
    enter: "rmd-menu--enter",
    enterActive: "rmd-menu--enter-active",
    exit: "rmd-menu--exit",
    exitActive: "rmd-menu--exit-active",
  },
  timeout: {
    enter: 200,
    exit: 150,
  },
  horizontal: false,
  disableCloseOnScroll: false,
  disableCloseOnResize: false,
};

Menu.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Menu.displayName = "Menu";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Menu.propTypes = {
      id: PropTypes.string.isRequired,
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
  }
}

export default forwardRef<HTMLDivElement, StrictProps>((props, ref) => (
  <Menu {...props} forwardedRef={ref} />
));
