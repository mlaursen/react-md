"use client";

import { type Ref, type RefCallback, useMemo } from "react";

import { type CSSVariable } from "../theme/types.js";
import { useElementSize } from "../useElementSize.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-layout-size"?: string;
    "--rmd-layout-header-height"?: string;
  }
}

/**
 * @since 6.0.0
 */
export interface LayoutAppBarHeightResult {
  height: number | undefined;
  variables: readonly CSSVariable[];
  appBarRef: RefCallback<HTMLDivElement>;
}

/**
 * @example Main Usage
 * ```tsx
 * import { AppBar } from "@react-md/core/app-bar/AppBar";
 * import { useLayoutAppBarHeight } from "@react-md/core/layout/useLayoutAppBarHeight";
 * import { useCSSVariables } from "@react-md/core/theme/useCSSVariables";
 * import type { PropsWithChildren, ReactElement } from "react";
 *
 * export function LayoutHeader({ children }: PropsWithChildren): ReactElement {
 *   const { appBarRef, variables } = useLayoutAppBarHeight();
 *   useCSSVariables(variables);
 *
 *   return (
 *     <AppBar ref={appBarRef} {...customProps}>
 *       <CustomChildren />
 *     </AppBar>
 *   );
 * };
 * ```
 *
 * @example Inline Variables
 * ```tsx
 * import { AppBar } from "@react-md/core/app-bar/AppBar";
 * import { useLayoutAppBarHeight } from "@react-md/core/layout/useLayoutAppBarHeight";
 * import { useCSSVariables } from "@react-md/core/theme/useCSSVariables";
 * import type { PropsWithChildren, ReactElement } from "react";
 *
 * export function Layout({ children }: PropsWithChildren): ReactElement {
 *   const { appBarRef, variables } = useLayoutAppBarHeight();
 *   const inlineStyle = useCSSVariables(variables, true);
 *
 *   return (
 *     <div style={inlineStyle}>
 *       <AppBar ref={appBarRef} {...customProps}>
 *         <CustomChildren />
 *       </AppBar>
 *       {children}
 *     </div>
 *   );
 * };
 * ```
 *
 * @see {@link https://next.react-md.dev/getting-started/layout|Layout Demos}
 * @since 6.0.0
 */
export function useLayoutAppBarHeight(
  ref?: Ref<HTMLDivElement>
): LayoutAppBarHeightResult {
  const { height, elementRef, observedOnce } = useElementSize({
    ref,
    disableWidth: true,
  });
  const variables = useMemo<CSSVariable[]>(() => {
    if (Number.isNaN(height) || !observedOnce) {
      return [];
    }

    return [{ name: "--rmd-layout-header-height", value: `${height}px` }];
  }, [height, observedOnce]);

  return {
    height,
    variables,
    appBarRef: elementRef,
  };
}
