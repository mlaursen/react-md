import { TextIconSpacing, Typography } from "react-md";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function IconAfterTextIconSpacingExample(): ReactElement {
  return (
    <Typography>
      <TextIconSpacing icon={<FavoriteIcon inline />} iconAfter>
        Some additional text to display.
      </TextIconSpacing>
    </Typography>
  );
}
