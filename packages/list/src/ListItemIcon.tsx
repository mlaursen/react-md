import React, { FunctionComponent } from "react";
import cn from "classnames";
import { TextIconSpacing, ITextIconSpacingProps } from "@react-md/icon";

export interface IListItemIconProps extends ITextIconSpacingProps {
  position: "before" | "after";
  avatar: boolean;
}

const ListItemIcon: FunctionComponent<IListItemIconProps> = ({
  className,
  avatar,
  position,
  children,
  ...props
}) => (
  <TextIconSpacing
    {...props}
    className={cn(className, {
      "rmd-list-item__avatar": avatar,
    })}
    iconAfter={position === "after"}
  >
    {children}
  </TextIconSpacing>
);

export default ListItemIcon;
