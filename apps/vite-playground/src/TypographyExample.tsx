import { Box } from "@react-md/core/box/Box";
import { Typography } from "@react-md/you/typography/Typography";
import {
  type TypographySize,
  type TypographyVariant,
} from "@react-md/you/typography/styles";
import { Fragment, type ReactElement } from "react";

const variants: TypographyVariant[] = [
  "body",
  "label",
  "title",
  "headline",
  "display",
];
const sizes: TypographySize[] = ["small", "medium", "large"];

export function TypographyExample(): ReactElement {
  return (
    <Box fullWidth>
      {variants.map((variant) => (
        <Box key={variant} fullWidth grid>
          {sizes.map((size) => (
            <Box key={size} stacked align="start">
              <Typography size={size} variant={variant}>
                {variant + "-" + size}
              </Typography>
              <Typography size={size} variant={variant} prominent>
                {variant + "-" + size + " prominent"}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
