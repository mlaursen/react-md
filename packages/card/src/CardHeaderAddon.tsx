/* eslint-disable react/prop-types */
import React, { HTMLAttributes, ReactElement } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

const block = bem("rmd-card");

/**
 * This component is used to dynamically add addons to the `CardHeader`
 * component. When no children are provided, nothing will be rendered.
 *
 * @internal
 */
export function CardHeaderAddon({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>): ReactElement | null {
  if (!children) {
    return null;
  }

  return (
    <span {...props} className={cn(block("header-addon"), className)}>
      {children}
    </span>
  );
}
