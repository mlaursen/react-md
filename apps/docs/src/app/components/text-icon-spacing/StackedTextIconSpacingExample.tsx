import { TextIconSpacing, Typography } from "react-md";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function StackedTextIconSpacingExample(): ReactElement {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TextIconSpacing icon={<FavoriteIcon />} stacked>
        <Typography margin="none">Some additional text to display.</Typography>
      </TextIconSpacing>
    </div>
  );
}
