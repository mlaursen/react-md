"use client";
import { cnb } from "cnbuilder";
import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import {
  DEFAULT_SHEET_CLASSNAMES,
  DEFAULT_SHEET_TIMEOUT,
} from "../sheet/Sheet.js";
import type { BaseSheetClassNameOptions } from "../sheet/styles.js";
import { sheet } from "../sheet/styles.js";
import type {
  CSSTransitionClassNames,
  TransitionActions,
  TransitionCallbacks,
  TransitionTimeout,
} from "../transition/types.js";
import { useCSSTransition } from "../transition/useCSSTransition.js";
import { layoutNav } from "./layoutNavStyles.js";

/**
 * @remarks \@since 6.0.0
 */
export interface LayoutNavProps
  extends HTMLAttributes<HTMLDivElement>,
    BaseSheetClassNameOptions,
    TransitionCallbacks,
    TransitionActions {
  children: ReactNode;

  /**
   * The component to render as.
   *
   * @defaultValue `"nav"`
   */
  as?: "nav" | "div";

  /**
   * Set this to `true` to display the navigation.
   */
  expanded: boolean;

  /**
   * Set this to `true` to force the navigation to appear below the fixed app
   * bar.
   *
   * @defaultValue `false`
   */
  appBarOffset?: boolean;

  /** @defaultValue {@link DEFAULT_SHEET_TIMEOUT} */
  timeout?: TransitionTimeout;
  /** @defaultValue {@link DEFAULT_SHEET_CLASSNAMES} */
  classNames?: CSSTransitionClassNames;
}

/**
 * **Client Component**
 *
 * This component is used to render a persistent navigation on the left of the
 * page. There is some built-in functionality to support resizing with the
 * `LayoutWindowSplitter` and expandable layouts. Do not use this component for
 * temporary navigation and instead use a `Sheet`.
 *
 * @example
 * Full Height Layout
 * ```tsx
 * "use client";
 * import {
 *   LayoutAppBar,
 *   LayoutNav,
 *   Main,
 *   useHorizontalLayoutTransition,
 * } from "@react-md/core";
 * import type { ReactElement, PropsWithChildren } from "react";
 *
 * function Layout({ children }: PropsWithChildren): ReactElement {
 *   const { elementProps } = useHorizontalLayoutTransition({
 *     transitionIn: true,
 *   });
 *
 *   return (
 *     <>
 *       <LayoutAppBar {...elementProps}>
 *         <YourAppBarContent />
 *       </LayoutAppBar>
 *       <LayoutNav expanded>
 *         <YourNavigationComponent />
 *       </LayoutNav>
 *       <Main navOffset appBarOffset {...elementProps}>
 *         {children}
 *       </Main>
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * Toggleable Layout
 * ```tsx
 * "use client";
 * import {
 *   LayoutNav,
 *   Main,
 *   useHorizontalLayoutTransition,
 *   useToggle,
 * } from "@react-md/core";
 * import MenuIcon from "@react-md/material-icons/MenuIcon";
 * import { cnb } from "cnbuilder";
 * import type { ReactElement, PropsWithChildren } from "react";
 *
 * function Layout({ children }: PropsWithChildren): ReactElement {
 *   const { toggled: expanded, toggle } = useToggle();
 *   const { elementProps } = useHorizontalLayoutTransition({
 *     transitionIn: expanded,
 *   });
 *
 *   return (
 *     <>
 *       <LayoutAppBar {...elementProps}>
 *         <Button
 *           aria-label="Navigation"
 *           onClick={toggle}
 *           buttonType="icon"
 *         >
 *           <MenuIcon />
 *         </Button>
 *         <YourAppBarContent />
 *       </LayoutAppBar>
 *       <LayoutNav expanded>
 *         <YourNavigationComponent />
 *       </LayoutNav>
 *       <Main navOffset={expanded} appBarOffset {...elementProps}>
 *         {children}
 *       </Main>
 *     </>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0
 */
export const LayoutNav = forwardRef<HTMLDivElement, LayoutNavProps>(
  function LayoutNav(props, ref) {
    const {
      as: Component = "nav",
      "aria-labelledby": ariaLabelledBy,
      "aria-label": ariaLabel = Component == "nav" && !ariaLabelledBy
        ? "Navigation"
        : undefined,
      expanded,
      children,
      className,
      timeout = DEFAULT_SHEET_TIMEOUT,
      classNames = DEFAULT_SHEET_CLASSNAMES,
      appear,
      enter,
      exit,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExited,
      onExiting,
      appBarOffset,
      ...remaining
    } = props;
    const { elementProps } = useCSSTransition({
      nodeRef: ref,
      timeout,
      className: cnb(
        layoutNav({ appBarOffset }),
        sheet({
          className,
          horizontalSize: "none",
          disableOverlay: true,
        })
      ),
      classNames,
      enter,
      exit,
      appear,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExited,
      onExiting,
      exitedHidden: true,
      transitionIn: expanded,
    });

    return (
      <Component
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...remaining}
        {...elementProps}
      >
        {children}
      </Component>
    );
  }
);
