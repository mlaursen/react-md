import React, { FunctionComponent } from "react";
import cn from "classnames";
import { TextIconSpacing, TextIconSpacingProps } from "@react-md/icon";

export interface ListItemIconProps extends TextIconSpacingProps {
  position: "before" | "after";
  avatar: boolean;
}

const ListItemIcon: FunctionComponent<ListItemIconProps> = ({
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
