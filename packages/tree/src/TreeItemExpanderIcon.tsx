import React, { ReactElement, ReactNode } from "react";
import { cnb } from "cnbuilder";
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
function TreeItemExpanderIcon({
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
      className={cnb(block("rotator-icon"), className)}
    >
      {icon}
    </IconRotator>
  );
}

export default TreeItemExpanderIcon;
