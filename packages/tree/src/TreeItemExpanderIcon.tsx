import React, { ReactElement, ReactNode } from "react";
import cn from "classnames";
import { IconRotator, IconRotatorBaseProps, useIcon } from "@react-md/icon";
import { bem } from "@react-md/utils";

export interface TreeItemExpanderIconProps extends IconRotatorBaseProps {
  children?: ReactNode;
}

const block = bem("rmd-tree-item");

/**
 * The `TreeItemExpanderIcon` is a simple wrapper of the `IconRotator` prop to
 * be used within a `TreeView`.
 */
export function TreeItemExpanderIcon({
  className,
  children,
  rotated = false,
  ...props
}: TreeItemExpanderIconProps): ReactElement {
  const icon = useIcon("expander", children);

  return (
    <IconRotator
      {...props}
      rotated={rotated}
      className={cn(block("rotator-icon"), className)}
    >
      {icon}
    </IconRotator>
  );
}
