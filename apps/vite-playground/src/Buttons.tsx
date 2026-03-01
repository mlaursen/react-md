import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/you/button/Button";
import {
  type ButtonShape,
  type ButtonSize,
  type ButtonVariant,
} from "@react-md/you/button/styles";
import { Typography } from "@react-md/you/typography/Typography";
import { Fragment, type ReactElement } from "react";

const sizes: ButtonSize[] = [
  "extra-small",
  "small",
  "medium",
  "large",
  "extra-large",
];
const variants: ButtonVariant[] = [
  "filled",
  "outlined",
  "text",
  "tonal",
  "elevated",
];
const shapes: ButtonShape[] = ["round", "square"];

export function Buttons(): ReactElement {
  return (
    <>
      <Typography variant="headline">Buttons</Typography>
      {variants.map((variant) => (
        <Fragment key={variant}>
          <Typography variant="title" style={{ textTransform: "capitalize" }}>
            {variant}
          </Typography>
          <Box>
            {shapes.map((shape) => (
              <Box key={shape}>
                {sizes.map((size) => (
                  <Fragment key={size}>
                    <Button size={size} variant={variant} shape={shape}>
                      Label text
                    </Button>
                    <Button
                      size={size}
                      variant={variant}
                      shape={shape}
                      disabled
                    >
                      Disabled
                    </Button>
                  </Fragment>
                ))}
              </Box>
            ))}
          </Box>
        </Fragment>
      ))}
      <hr />
    </>
  );
}
