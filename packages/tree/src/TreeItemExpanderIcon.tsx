import React, { ReactElement } from "react";
import cn from "classnames";
import { FontIcon, IconRotator, IIconRotatorBaseProps } from "@react-md/icon";

export interface ITreeItemExpanderIconProps extends IIconRotatorBaseProps {
  children?: React.ReactElement<any>;
}

export interface ITreeItemExpanderIconDefaultProps {
  rotated: boolean;
  children: ReactElement<any>;
}

export type TreeItemExpanderWithDefaultProps = ITreeItemExpanderIconProps &
  ITreeItemExpanderIconDefaultProps;

/**
 * The `TreeItemExpanderIcon` is a simple wrapper of the `IconRotator` prop to be used within
 * a `TreeView`.
 */
const TreeItemExpanderIcon: React.FunctionComponent<
  ITreeItemExpanderIconProps
> = providedProps => {
  const {
    className,
    ...props
  } = providedProps as TreeItemExpanderWithDefaultProps;

  return (
    <IconRotator
      {...props}
      className={cn("rmd-tree-item__rotator-icon", className)}
    />
  );
};

const defaultProps: ITreeItemExpanderIconDefaultProps = {
  rotated: false,
  children: <FontIcon>keyboard_arrow_down</FontIcon>,
};

TreeItemExpanderIcon.defaultProps = defaultProps;

export default TreeItemExpanderIcon;
