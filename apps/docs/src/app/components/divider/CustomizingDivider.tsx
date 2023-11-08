import { Divider, TextContainer, Typography } from "@react-md/core";
import { type ReactElement } from "react";

export default function CustomizingDivider(): ReactElement {
  return (
    <TextContainer
      style={{
        // these two are the default values
        "--rmd-divider-size": "0.0625rem",
        "--rmd-divider-spacing": "0.25rem auto",

        "--rmd-divider-color": "orange",
      }}
    >
      <Typography>Here is some text to separate.</Typography>
      <Divider />
      <Typography>Second paragraph of text.</Typography>
    </TextContainer>
  );
}
