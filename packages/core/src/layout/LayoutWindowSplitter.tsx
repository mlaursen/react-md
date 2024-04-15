"use client";
import { forwardRef, useMemo } from "react";
import { type DefinedCSSVariableName } from "../theme/types.js";
import { useCSSVariables } from "../theme/useCSSVariables.js";
import {
  WindowSplitter,
  type BaseWindowSplitterProps,
} from "../window-splitter/WindowSplitter.js";
import { type WindowSplitterWidgetProps } from "../window-splitter/useWindowSplitter.js";
import {
  layoutWindowSplitter,
  type LayoutWindowSplitterClassNameOptions,
} from "./layoutWindowSplitterStyles.js";

/**
 * @since 6.0.0
 */
export interface LayoutWindowSplitterProps
  extends WindowSplitterWidgetProps<HTMLButtonElement>,
    Omit<
      BaseWindowSplitterProps,
      keyof WindowSplitterWidgetProps<HTMLButtonElement>
    >,
    LayoutWindowSplitterClassNameOptions {
  /** @defaultValue `"Resize Navigation"` */
  "aria-label"?: string;

  /**
   * The current navigation width (in px).
   */
  navWidth: number;
}

/**
 * **Client Component**
 *
 * This component is used to resize the `LayoutNav` component.
 *
 * @see {@link useResizableExpandableLayout} for a default implementation for
 * this component.
 *
 * @example Dynamic Resizing
 * ```tsx
 * import {
 *   LayoutNav,
 *   LayoutWindowSplitter,
 *   Main,
 *   NoSsr,
 *   useWindowSize,
 *   useWindowSplitter,
 * } from "@react-md/core";
 * import type { ReactElement, PropsWithChildren } from "react"
 *
 * function MyWindowSplitter(): ReactElement {
 *   const { width } = useWindowSize({ disableHeight: true });
 *   const min = 96;
 *   const max = Math.max(600, width * .7);
 *
 *   const { value, splitterProps } = useWindowSplitter({
 *     min,
 *     max,
 *     defaultValue: 256,
 *   });
 *
 *   return (
 *     <LayoutWindowSplitter
 *       aria-controls="layout-nav-id"
 *       {...splitterProps}
 *       value={value}
 *     />
 *   );
 * }
 *
 * function Layout({ children }: PropsWithChildren): ReactElement {
 *   return (
 *     <>
 *       <LayoutNav id="layout-nav" {...otherProps}>
 *         <YourNavigation />
 *       </LayoutNav>
 *       // only required when using SSR
 *       <NoSsr>
 *         <MyWindowSplitter />
 *       </NoSsr>
 *       <Main navOffset>
 *         {children}
 *       </Main>
 *     </>
 *   );
 * }
 * ```
 *
 * @since 6.0.0
 */
export const LayoutWindowSplitter = forwardRef<
  HTMLButtonElement,
  LayoutWindowSplitterProps
>(function LayoutWindowSplitter(props, ref) {
  const {
    "aria-labelledby": ariaLabelledBy,
    "aria-label": ariaLabel = ariaLabelledBy ? undefined : "Resize Navigation",
    appBarOffset,
    disableResponsive,
    className,
    navWidth,
    ...remaining
  } = props;

  useCSSVariables<DefinedCSSVariableName>(
    useMemo(
      () => [{ name: "--rmd-layout-size", value: `${navWidth}px` }],
      [navWidth]
    )
  );

  return (
    <WindowSplitter
      {...remaining}
      ref={ref}
      aria-label={ariaLabel as string}
      aria-labelledby={ariaLabelledBy}
      className={layoutWindowSplitter({
        appBarOffset,
        disableResponsive,
        className,
      })}
    />
  );
});
