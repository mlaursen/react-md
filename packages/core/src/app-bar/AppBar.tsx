import {
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
  type Ref,
} from "react";

import { type AppBarClassNameOptions, appBar } from "./styles.js";

/** @since 6.0.0 */
export type CustomAppBarComponent = ElementType<
  HTMLAttributes<HTMLDivElement> & {
    ref?: Ref<HTMLDivElement>;
    className: string;
  }
>;

/**
 * @since 6.0.0 Renamed the `component` prop to `as` and updated the default
 * value to be a `"div"` when `fixed` is `false`.
 * @since 6.0.0 Renamed the `fixedElevation` prop to `disableFixedElevation` to
 * match naming conventions when a feature is enabled by default.
 * @since 6.0.0 Removed the `inheritColor` and `flexWrap` props since they are
 * no longer required.
 * @since 6.0.0 Removed the `fixed` prop in favor of the new `position` prop
 * which enables position `fixed` or `sticky` behavior.
 * @since 6.0.0 Added the {@link stacked} and {@link scrollbarOffset} props.
 */
export interface AppBarProps
  extends HTMLAttributes<HTMLDivElement>, AppBarClassNameOptions {
  ref?: Ref<HTMLDivElement>;
  /** @defaultValue `fixed ? "header" : "div"` */
  as?: CustomAppBarComponent;
}

/**
 * @example Simple Example
 * ```tsx
 * import { AppBar } from "@react-md/core/app-bar/AppBar";
 * import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
 * import { Button } from "@react-md/core/button/Button";
 * import MenuIcon from "@react-md/material-icons/MenuIcon";
 * import MoreVertIcon from "@react-md/material-icons/MoreVertIcon";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <AppBar>
 *       <Button aria-label="Navigation"><MenuIcon /></Button>
 *       <AppBarTitle>My Main Title</AppBarTitle>
 *       <Button aria-label="Options"><MoreVertIcon /></Button>
 *     </AppBar>
 *   );
 * }
 * ```
 *
 * @since 6.0.0 The `AppBar` was updated to use `gap` for spacing
 * instead of requiring the `AppBarNav` and `AppBarAction` components.
 */
export function AppBar(props: AppBarProps): ReactElement {
  const {
    ref,
    className,
    theme,
    stacked,
    height,
    align,
    grid,
    gridName,
    justify,
    reversed,
    gridColumns,
    disableWrap,
    disablePadding,
    position,
    pagePosition,
    surfaceColor,
    scrollbarOffset,
    disableElevation,
    as: Component = position ? "header" : "div",
    children,
    ...remaining
  } = props;

  return (
    <Component
      {...remaining}
      className={appBar({
        className,
        theme,
        position,
        pagePosition,
        disableElevation,
        scrollbarOffset,
        height,
        grid,
        gridName,
        gridColumns,
        align,
        stacked,
        justify,
        reversed,
        surfaceColor,
        disableWrap,
        disablePadding,
      })}
      ref={ref}
    >
      {children}
    </Component>
  );
}
