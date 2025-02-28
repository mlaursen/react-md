"use client";

import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactNode, forwardRef } from "react";

import {
  type BaseSheetClassNameOptions,
  DEFAULT_SHEET_CLASSNAMES,
  DEFAULT_SHEET_TIMEOUT,
  sheet,
} from "../sheet/styles.js";
import {
  type CSSTransitionClassNames,
  type TransitionActions,
  type TransitionCallbacks,
  type TransitionTimeout,
} from "../transition/types.js";
import { useCSSTransition } from "../transition/useCSSTransition.js";
import { layoutNav } from "./layoutNavStyles.js";

/**
 * @since 6.0.0
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
 * @example Full Height Layout
 * ```tsx
 * "use client";
 * import { LayoutAppBar } from "@react-md/core/layout/LayoutAppBar";
 * import { LayoutNav } from "@react-md/core/layout/LayoutNav";
 * import { Main } from "@react-md/core/layout/Main";
 * import { useHorizontalLayoutTransition } from "@react-md/core/layout/useHorizontalLayoutTransition";
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
 * @example Toggleable Layout
 * ```tsx
 * "use client";
 * import { LayoutAppBar } from "@react-md/core/layout/LayoutAppBar";
 * import { Main } from "@react-md/core/layout/Main";
 * import { useHorizontalLayoutTransition } from "@react-md/core/layout/useHorizontalLayoutTransition";
 * import { useToggle } from "@react-md/core/useToggle";
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
 * @since 6.0.0
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
