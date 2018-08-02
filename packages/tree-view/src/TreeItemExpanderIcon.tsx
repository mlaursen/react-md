import * as React from "react";
import { IconRotator, IIconRotatorBaseProps } from "@react-md/icon";
import { KeyboardArrowDownSVGIcon } from "@react-md/material-icons";

export interface ITreeItemExpanderIconProps extends IIconRotatorBaseProps {
  children?: React.ReactElement<any>;
}

export interface ITreeItemExpanderIconDefaultProps {
  to: number;
  from: number;
  rotated: boolean;
  children: React.ReactElement<any>;
}

export type TreeItemExpanderWithDefaultProps = ITreeItemExpanderIconProps & ITreeItemExpanderIconDefaultProps;

const TreeItemExpanderIcon: React.SFC<ITreeItemExpanderIconProps> = providedProps => {
  const props = providedProps as ITreeItemExpanderIconDefaultProps;
  return <IconRotator {...props} />;
};

TreeItemExpanderIcon.defaultProps = {
  rotated: false,
  to: 0,
  from: 90,
  children: <KeyboardArrowDownSVGIcon />,
} as ITreeItemExpanderIconDefaultProps;

export default TreeItemExpanderIcon;
