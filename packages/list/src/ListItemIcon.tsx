/* eslint-disable react/prop-types, react/destructuring-assignment */
import React, { FC } from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { TextIconSpacing, TextIconSpacingProps } from "@react-md/icon";

export type ListItemIconPosition = "top" | "middle" | "bottom";

export interface ListItemIconProps extends TextIconSpacingProps {
  before: boolean;
  avatar: boolean;
  media: boolean;
  mediaLarge: boolean;
  position: ListItemIconPosition;
}

const base = bem("rmd-list-item");

const ListItemIcon: FC<ListItemIconProps> = ({
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
      base("icon", {
        [position]: position !== "middle",
        avatar,
        media: media || mediaLarge,
        "media-large": mediaLarge,
      }),
      className
    )}
    iconAfter={!before}
  >
    {children}
  </TextIconSpacing>
);

export default ListItemIcon;
