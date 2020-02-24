/* eslint-disable react/prop-types */
import React, { ReactElement } from "react";
import { TextIconSpacing, TextIconSpacingProps } from "@react-md/icon";
import { bem } from "@react-md/utils";
import { cnb } from "cnbuilder";

export type ListItemIconPosition = "top" | "middle" | "bottom";

export interface ListItemIconProps extends TextIconSpacingProps {
  before: boolean;
  avatar: boolean;
  media: boolean;
  mediaLarge: boolean;
  position: ListItemIconPosition;
}

const base = bem("rmd-list-item");

function ListItemIcon({
  className,
  avatar,
  before,
  children,
  media,
  mediaLarge,
  position,
  forceIconWrap,
  ...props
}: ListItemIconProps): ReactElement {
  return (
    <TextIconSpacing
      {...props}
      forceIconWrap={forceIconWrap || media}
      className={cnb(
        base("icon", {
          [position]: position !== "middle",
          before,
          "avatar-before": before && avatar,
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
}

export default ListItemIcon;
