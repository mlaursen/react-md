"use client";

import { forwardRef } from "react";

import {
  AppBar,
  type AppBarProps,
  type CustomAppBarComponent,
} from "../app-bar/AppBar.js";
import {
  SkipToMainContent,
  type SkipToMainContentProps,
} from "../link/SkipToMainContent.js";
import { useCSSVariables } from "../theme/useCSSVariables.js";
import { type CssPosition, type PropsWithRef } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useLayoutAppBarHeight } from "./useLayoutAppBarHeight.js";

/**
 * @since 6.0.0 Only supports `AppBar` + `SkipToMainContent` props
 */
export interface LayoutAppBarProps extends AppBarProps {
  /** @defaultValue `"header"` */
  as?: CustomAppBarComponent;

  /** @defaultValue `"fixed"` */
  position?: CssPosition;

  /**
   * Any additional props to pass to the {@link SkipToMainContent} component.
   */
  skipProps?: PropsWithRef<SkipToMainContentProps, HTMLAnchorElement>;
}

/**
 * **Client Component**
 *
 * This component is used to dynamically update the `--rmd-layout-header-offset`
 * based on the current height of this app bar. If you are concerned about
 * javascript bundle size, it is recommended to configure this variable in SCSS
 * instead.
 *
 * @example Static Height
 * ```scss
 * @use "everything";
 *
 * :root {
 *   @include everything.layout-set-var(header-height, everything.$app-bar-height);
 * }
 * ```
 *
 * @example Media Query Height Changes
 * ```scss
 * @use "everything";
 *
 * :root {
 *   @include everything.layout-set-var(header-height, everything.$app-bar-height);
 *   @include everything.tablet-media {
 *     @include everything.layout-set-var(header-height, everything.$app-bar-dense-height);
 *   }
 * }
 * ```
 *
 * @see {@link https://react-md.dev/getting-started/layout | Layout Demos}
 * @since 6.0.0 This component no longer renders the `LayoutNavToggle` and
 * `LayoutAppBarTitle` since they no longer exist. The only purpose of this
 * component is to dynamically set the `--rmd-layout-header-height` variable.
 */
export const LayoutAppBar = forwardRef<HTMLDivElement, LayoutAppBarProps>(
  function LayoutAppBar(props, ref) {
    const {
      as = "header",
      id: propId,
      position = "fixed",
      skipProps,
      children,
      ...remaining
    } = props;
    const id = useEnsuredId(propId, "layout-header");
    const { appBarRef, variables } = useLayoutAppBarHeight(ref);
    useCSSVariables(variables);

    return (
      <AppBar
        {...remaining}
        id={id}
        as={as}
        ref={appBarRef}
        position={position}
      >
        <SkipToMainContent {...skipProps} />
        {children}
      </AppBar>
    );
  }
);
