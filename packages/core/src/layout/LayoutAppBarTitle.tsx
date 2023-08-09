import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import type { AppBarTitleProps } from "../app-bar/AppBarTitle";
import { AppBarTitle } from "../app-bar/AppBarTitle";
import { bem } from "../utils/bem";
import { useLayoutConfig } from "./LayoutProvider";
import { isFullHeightLayout } from "./utils";

export type LayoutAppBarTitleProps = AppBarTitleProps;

const styles = bem("rmd-layout-title");

/**
 * An extremely simple wrapper for the `AppBarTitle` that will automatically
 * apply an `id` and apply the correct margin for full-height layouts.
 */
export const LayoutAppBarTitle = forwardRef<
  HTMLDivElement,
  LayoutAppBarTitleProps
>(function LayoutAppBarTitle(props, ref) {
  const { id: propId, className, children, ...remaining } = props;

  const { baseId, layout } = useLayoutConfig();
  const id = propId ?? `${baseId}-title`;
  return (
    <AppBarTitle
      {...remaining}
      id={id}
      ref={ref}
      className={cnb(styles({ offset: isFullHeightLayout(layout) }), className)}
    >
      {children}
    </AppBarTitle>
  );
});
