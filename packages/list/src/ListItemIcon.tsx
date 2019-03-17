import React, { FunctionComponent } from "react";
import cn from "classnames";
import { TextIconSpacing, TextIconSpacingProps } from "@react-md/icon";

export interface ListItemIconProps extends TextIconSpacingProps {
  position: "before" | "after";
  avatar: boolean;
  media: boolean;
  mediaLarge: boolean;
}

const ListItemIcon: FunctionComponent<ListItemIconProps> = ({
  className,
  avatar,
  position,
  children,
  media,
  mediaLarge,
  ...props
}) => (
  <TextIconSpacing
    {...props}
    forceIconWrap={props.forceIconWrap || media}
    className={cn(
      "rmd-list-item__icon",
      {
        "rmd-list-item__avatar": avatar,
        "rmd-list-item__media": media || mediaLarge,
        "rmd-list-item__media--large": mediaLarge,
      },
      className
    )}
    iconAfter={position === "after"}
  >
    {children}
  </TextIconSpacing>
);

export default ListItemIcon;
