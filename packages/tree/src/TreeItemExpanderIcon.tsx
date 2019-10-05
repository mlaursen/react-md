import React, { ReactNode, FC } from "react";
import cn from "classnames";
import { FontIcon, IconRotator, IconRotatorBaseProps } from "@react-md/icon";
import { bem } from "@react-md/utils";

export interface TreeItemExpanderIconProps extends IconRotatorBaseProps {
  children?: ReactNode;
}

type DefaultProps = Required<
  Pick<TreeItemExpanderIconProps, "rotated" | "children">
>;
type WithDefaultProps = TreeItemExpanderIconProps & DefaultProps;

const block = bem("rmd-tree-item");

/**
 * The `TreeItemExpanderIcon` is a simple wrapper of the `IconRotator` prop to be used within
 * a `TreeView`.
 */
const TreeItemExpanderIcon: FC<TreeItemExpanderIconProps> = providedProps => {
  const { className, ...props } = providedProps as WithDefaultProps;

  return (
    <IconRotator {...props} className={cn(block("rotator-icon"), className)} />
  );
};

const defaultProps: DefaultProps = {
  rotated: false,
  children: <FontIcon>keyboard_arrow_down</FontIcon>,
};

TreeItemExpanderIcon.defaultProps = defaultProps;

export default TreeItemExpanderIcon;
