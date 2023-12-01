import { TextIconSpacing, Typography } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function SimpleTextIconSpacingExample(): ReactElement {
  return (
    <Typography>
      <TextIconSpacing icon={<FavoriteIcon inline />}>
        Some additional text to display.
      </TextIconSpacing>
    </Typography>
  );
}
