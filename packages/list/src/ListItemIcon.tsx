import React, { FunctionComponent } from "react";
import cn from "classnames";
import { TextIconSpacing, TextIconSpacingProps } from "@react-md/icon";

export type ListItemIconPosition = "top" | "middle" | "bottom";

export interface ListItemIconProps extends TextIconSpacingProps {
  before: boolean;
  avatar: boolean;
  media: boolean;
  mediaLarge: boolean;
  position: ListItemIconPosition;
}

const ListItemIcon: FunctionComponent<ListItemIconProps> = ({
  className,
  avatar,
  before,
  children,
  media,
  mediaLarge,
  position,
  ...props
}) => (
  <TextIconSpacing
    {...props}
    forceIconWrap={props.forceIconWrap || media}
    className={cn(
      "rmd-list-item__icon",
      {
        [`rmd-list-item__icon--${position}`]: position !== "middle",
        "rmd-list-item__avatar": avatar,
        "rmd-list-item__media": media || mediaLarge,
        "rmd-list-item__media--large": mediaLarge,
      },
      className
    )}
    iconAfter={!before}
  >
    {children}
  </TextIconSpacing>
);

export default ListItemIcon;
