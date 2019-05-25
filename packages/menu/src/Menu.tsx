import React, {
  forwardRef,
  FC,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react";
import cn from "classnames";
import { CSSTransition } from "react-transition-group";
import {
  ConditionalPortal,
  RenderConditionalPortalProps,
} from "@react-md/portal";
import { bem } from "@react-md/theme";
import {
  CSSTransitionProps,
  PositionAnchor,
  useFixedPositioning,
} from "@react-md/transition";
import { applyRef, RequireAtLeastOne, WithForwardedRef } from "@react-md/utils";
import { useKeyboardMovement } from "@react-md/wia-aria";

import MenuEvents from "./MenuEvents";
import { OrientationProvider } from "./Orientation";

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
   * originate from a coordinate.
   */
  anchor?: PositionAnchor;

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
   * An optional function to call when the page is resized while the menu is visible.
   * The default behavior is to close the menu.
   */
  onResize?: () => void;

  /**
   * An optional function to call when the page is scrolled while the menu is visible.
   * The default behavior is to close the menu.
   */
  onPageScroll?: () => void;
}

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
    | "anchor"
    | "defaultFocus"
  >
>;
type WithDefaultProps = MenuProps & DefaultProps & WithRef;
type StrictMenuProps = MenuProps &
  RequireAtLeastOne<MenuProps, "aria-label" | "aria-labelledby">;

const block = bem("rmd-menu");

const Menu: FC<StrictMenuProps & WithRef> = providedProps => {
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
    anchor,
    onPageScroll,
    onResize,
    onClick,
    onKeyDown,
    defaultFocus,
    horizontal,
    ...props
  } = providedProps as WithDefaultProps;

  const menu = useRef<HTMLDivElement | null>(null);
  const ref = useCallback(
    (instance: HTMLDivElement | null) => {
      applyRef(instance, forwardedRef);
      menu.current = instance;
    },
    [forwardedRef]
  );

  const handleScroll = useCallback(
    (event: Event) => {
      if (
        !menu.current ||
        !event.target ||
        !menu.current.contains(event.target as HTMLElement)
      ) {
        onRequestClose();
      }
    },
    [onRequestClose]
  );

  const { style, ...transitionHandlers } = useFixedPositioning({
    fixedTo: () => document.getElementById(controlId),
    onScroll: onPageScroll || handleScroll,
    onResize: onResize || onRequestClose,
    ...anchor,
    onEnter,
    onEntering,
    onEntered,
    onExited,
    transformOrigin: true,
  });

  useEffect(() => {
    if (!visible) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target || !menu.current || !menu.current.contains(target)) {
        onRequestClose();
      }
    };

    window.addEventListener("click", handleClick, true);
    return () => {
      window.removeEventListener("click", handleClick, true);
    };
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        onClick(event);
      }

      if (event.currentTarget !== event.target) {
        onRequestClose();
      }
    },
    [onClick, onRequestClose]
  );

  const handleKeyDown = useKeyboardMovement<HTMLDivElement>({
    onKeyDown: event => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (event.key === "Escape") {
        onRequestClose();
      }
    },
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
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            {children}
            <MenuEvents menuRef={menu} defaultFocus={defaultFocus} />
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
  anchor: {
    x: "inner-right",
    y: "top",
  },
  horizontal: false,
};

Menu.defaultProps = defaultProps;

export default forwardRef<HTMLDivElement, StrictMenuProps>((props, ref) => (
  <Menu {...props} forwardedRef={ref} />
));
