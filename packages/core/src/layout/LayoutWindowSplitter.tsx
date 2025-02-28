"use client";

import { forwardRef, useMemo } from "react";

import { type DefinedCSSVariableName } from "../theme/types.js";
import { useCSSVariables } from "../theme/useCSSVariables.js";
import {
  type BaseWindowSplitterProps,
  WindowSplitter,
} from "../window-splitter/WindowSplitter.js";
import { type WindowSplitterWidgetProps } from "../window-splitter/useWindowSplitter.js";
import {
  type LayoutWindowSplitterClassNameOptions,
  layoutWindowSplitter,
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
 * import { LayoutNav } from "@react-md/core/layout/LayoutNav";
 * import { LayoutWindowSplitter } from "@react-md/core/layout/LayoutWindowSplitter";
 * import { Main } from "@react-md/core/layout/Main";
 * import { NoSsr } from "@react-md/core/NoSsr";
 * import { useWindowSplitter } from "@react-md/core/window-splitter/useWindowSplitter";
 * import { useWindowSize } from "@react-md/core/useWindowSize";
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
