import { forwardRef } from "react";
import cn from "classnames";
import type { AppBarTitleProps } from "@react-md/app-bar";
import { AppBarTitle } from "@react-md/app-bar";
import { bem } from "@react-md/utils";

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
>(function LayoutAppBarTitle(
  { id: propId, className, children, ...props },
  ref
) {
  const { baseId, layout } = useLayoutConfig();
  const id = propId ?? `${baseId}-title`;
  return (
    <AppBarTitle
      {...props}
      id={id}
      ref={ref}
      className={cn(styles({ offset: isFullHeightLayout(layout) }), className)}
    >
      {children}
    </AppBarTitle>
  );
});
