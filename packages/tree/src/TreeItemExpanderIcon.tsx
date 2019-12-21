import React, { FC, ReactNode } from "react";
import cn from "classnames";
import { IconRotator, IconRotatorBaseProps, useIcon } from "@react-md/icon";
import { bem } from "@react-md/utils";

export interface TreeItemExpanderIconProps extends IconRotatorBaseProps {
  children?: ReactNode;
}

type DefaultProps = Required<Pick<TreeItemExpanderIconProps, "rotated">>;
type WithDefaultProps = TreeItemExpanderIconProps & DefaultProps;

const block = bem("rmd-tree-item");

/**
 * The `TreeItemExpanderIcon` is a simple wrapper of the `IconRotator` prop to be used within
 * a `TreeView`.
 */
const TreeItemExpanderIcon: FC<TreeItemExpanderIconProps> = providedProps => {
  const { className, children, ...props } = providedProps as WithDefaultProps;
  const icon = useIcon("expander", children);

  return (
    <IconRotator {...props} className={cn(block("rotator-icon"), className)}>
      {icon}
    </IconRotator>
  );
};

const defaultProps: DefaultProps = {
  rotated: false,
};

TreeItemExpanderIcon.defaultProps = defaultProps;

export default TreeItemExpanderIcon;
