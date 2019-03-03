import React, { ReactElement } from "react";
import { FontIcon, IconRotator, IIconRotatorBaseProps } from "@react-md/icon";

export interface ITreeItemExpanderIconProps extends IIconRotatorBaseProps {
  children?: React.ReactElement<any>;
}

export interface ITreeItemExpanderIconDefaultProps {
  to: number;
  from: number;
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
  const props = providedProps as ITreeItemExpanderIconDefaultProps;
  return <IconRotator {...props} />;
};

const defaultProps: ITreeItemExpanderIconDefaultProps = {
  rotated: false,
  to: 0,
  from: 90,
  children: <FontIcon>keyboard_arrow_down</FontIcon>,
};

TreeItemExpanderIcon.defaultProps = defaultProps;

export default TreeItemExpanderIcon;
