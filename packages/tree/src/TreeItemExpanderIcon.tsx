import React, { ReactElement } from "react";
import cn from "classnames";
import { FontIcon, IconRotator, IconRotatorBaseProps } from "@react-md/icon";

export interface TreeItemExpanderIconProps extends IconRotatorBaseProps {
  children?: React.ReactElement<any>;
}

type DefaultProps = Required<
  Pick<TreeItemExpanderIconProps, "rotated" | "children">
>;
export type WithDefaultProps = TreeItemExpanderIconProps & DefaultProps;

/**
 * The `TreeItemExpanderIcon` is a simple wrapper of the `IconRotator` prop to be used within
 * a `TreeView`.
 */
const TreeItemExpanderIcon: React.FunctionComponent<
  TreeItemExpanderIconProps
> = providedProps => {
  const { className, ...props } = providedProps as WithDefaultProps;

  return (
    <IconRotator
      {...props}
      className={cn("rmd-tree-item__rotator-icon", className)}
    />
  );
};

const defaultProps: DefaultProps = {
  rotated: false,
  children: <FontIcon>keyboard_arrow_down</FontIcon>,
};

TreeItemExpanderIcon.defaultProps = defaultProps;

export default TreeItemExpanderIcon;
