"use client";
import type { Ref, RefCallback } from "react";
import { useMemo } from "react";
import type { DefinedCSSVariableName } from "../theme/types.js";
import type { CSSVariable } from "../theme/useCSSVariables.js";
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
  variables: readonly CSSVariable<DefinedCSSVariableName>[];
  appBarRef: RefCallback<HTMLDivElement>;
}

/**
 * @example
 * Main Usage
 * ```tsx
 * import type { PropsWithChildren, ReactElement } from "react";
 * import {
 *   AppBar,
 *   useCSSVariables,
 *   useLayoutAppBarHeight
 * } from "@react-md/core";
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
 * @example
 * Inline Variables
 * ```tsx
 * import type { PropsWithChildren, ReactElement } from "react";
 * import {
 *   AppBar,
 *   useCSSVariables,
 *   useLayoutAppBarHeight
 * } from "@react-md/core";
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
 * @since 6.0.0
 */
export function useLayoutAppBarHeight(
  ref?: Ref<HTMLDivElement>
): LayoutAppBarHeightResult {
  const { height, elementRef } = useElementSize({
    ref,
    disableWidth: true,
  });
  const variables = useMemo<CSSVariable<DefinedCSSVariableName>[]>(() => {
    if (Number.isNaN(height)) {
      return [];
    }

    return [{ name: "--rmd-layout-header-height", value: `${height}px` }];
  }, [height]);

  return {
    height,
    variables,
    appBarRef: elementRef,
  };
}
