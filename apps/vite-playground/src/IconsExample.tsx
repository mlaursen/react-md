import { Box } from "@react-md/core/box/Box";
import { MaterialSymbol } from "@react-md/you/icon/MaterialSymbol";
import { type PaletteTextColor } from "@react-md/you/styles/palette";
import { Typography } from "@react-md/you/typography/Typography";
import { type ReactElement } from "react";

const colors: PaletteTextColor[] = [
  "primary",
  "on-primary",
  "on-primary-container",
  "secondary",
  "on-secondary",
  "on-secondary-container",
  "tertiary",
  "on-tertiary",
  "on-tertiary-container",
  "error",
  "on-error",
  "on-error-container",

  "on-background",
  "on-surface",
  "on-surface-variant",
  "on-inverse-surface",

  "currentcolor",
];

export function IconsExample(): ReactElement {
  return (
    <Box grid style={{ "--rmd-icon-size": "8rem" }} gridItemSize="12rem">
      {colors.map((textColor) => (
        <Box key={textColor} stacked>
          <MaterialSymbol name="4k" textColor={textColor} />
          <Typography
            margin="none"
            textAlign="center"
            textTransform="capitalize"
          >
            {textColor}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
