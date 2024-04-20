"use client";
import { cnb } from "cnbuilder";
import { DEFAULT_SHEET_TIMEOUT } from "../sheet/Sheet.js";
import {
  type CSSTransitionClassNames,
  type CSSTransitionHookReturnValue,
  type PreconfiguredCSSTransitionOptions,
  type TransitionTimeout,
} from "../transition/types.js";
import { useCSSTransition } from "../transition/useCSSTransition.js";

/**
 * @since 6.0.0
 */
export const DEFAULT_HORIZONTAL_LAYOUT_TRANSITION_CLASSNAMES = {
  appearDone: "rmd-layout-h--active",
  enter: "rmd-layout-h--enter",
  enterActive: "rmd-layout-h--active",
  enterDone: "rmd-layout-h--active",
  exit: "rmd-layout-h--exit",
} satisfies Readonly<CSSTransitionClassNames>;

/**
 * @since 6.0.0
 */
export interface HorizontalLayoutTransitionOptions
  extends PreconfiguredCSSTransitionOptions<HTMLElement> {
  /**
   * @see {@link DEFAULT_SHEET_TIMEOUT}
   * @defaultValue `DEFAULT_SHEET_TIMEOUT`
   */
  timeout?: TransitionTimeout;
  /**
   * @see {@link DEFAULT_HORIZONTAL_LAYOUT_TRANSITION_CLASSNAMES}
   * @defaultValue `DEFAULT_HORIZONTAL_LAYOUT_TRANSITION_CLASSNAMES`
   */
  classNames?: CSSTransitionClassNames;
}

/**
 * @example
 * ```tsx
 * import { LayoutAppBar, Main, useHorizontalLayoutTransition } from "@react-md/core";
 * import type { ReactElement, ReactNode } from "react";
 *
 * interface Props {
 *   title: ReactNode;
 *   children: ReactNode;
 * }
 *
 * export default function Example({ title, children }: Props): ReactElement {
 *   const { toggled: staticNavExpanded, toggle: toggleStaticNav } = useToggle();
 *   const { elementProps, className } = useHorizontalLayoutTransition({
 *     transitionIn: staticNavExpanded,
 *   });
 *
 *   return (
 *     <>
 *       <LayoutAppBar className={className}>
 *         <Button
 *           aria-label="Navigation"
 *           buttonType="icon"
 *           onClick={toggleStaticNav}
 *         >
 *           <MenuOutlinedIcon />
 *         '</Button>
 *         {title}
 *       </LayoutAppBar>
 *       <Main {...elementProps}>
 *         {children}
 *       </Main>
 *     </>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useHorizontalLayoutTransition<
  E extends HTMLElement = HTMLElement,
>(options: HorizontalLayoutTransitionOptions): CSSTransitionHookReturnValue<E> {
  return useCSSTransition({
    timeout: DEFAULT_SHEET_TIMEOUT,
    classNames: DEFAULT_HORIZONTAL_LAYOUT_TRANSITION_CLASSNAMES,
    ...options,
    className: cnb("rmd-layout-h", options.className),
  });
}
