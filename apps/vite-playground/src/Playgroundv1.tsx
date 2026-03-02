import { Typography } from "@react-md/core/material-you/typography/Typography";
import {
  type TypographySize,
  type TypographyVariant,
} from "@react-md/core/material-you/typography/styles";
import { Fragment, type ReactElement } from "react";

import { Buttons } from "./Buttons";

const variants: TypographyVariant[] = [
  "body",
  "label",
  "title",
  "headline",
  "display",
];
const sizes: TypographySize[] = ["small", "medium", "large"];

export function Playground(): ReactElement {
  return (
    <>
      <Buttons />
      {variants.map((variant) => (
        <Fragment key={variant}>
          {sizes.map((size) => (
            <Fragment key={size}>
              <Typography size={size} variant={variant}>
                {variant + "-" + size}
              </Typography>
              <Typography size={size} variant={variant} prominent>
                {variant + "-" + size + " prominent"}
              </Typography>
            </Fragment>
          ))}
          <hr />
        </Fragment>
      ))}
    </>
  );
}
