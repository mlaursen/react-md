import { Box } from "@react-md/core/box/Box";
import { Button } from "@react-md/you/button/Button";
import {
  type ButtonShape,
  type ButtonSize,
  type ButtonVariant,
} from "@react-md/you/button/styles";
import { MaterialSymbol } from "@react-md/you/icon/MaterialSymbol";
import { Typography } from "@react-md/you/typography/Typography";
import { Fragment, type ReactElement } from "react";

import styles from "./Buttons.module.scss";

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
    <Box stacked align="start">
      <Typography variant="display" margin="none-bottom">
        Buttons
      </Typography>
      {variants.map((variant) =>
        shapes.map((shape) => (
          <Fragment key={variant + shape}>
            <Typography
              margin="none-bottom"
              variant="headline"
              textTransform="capitalize"
            >
              {variant} {shape}
            </Typography>
            <div className={styles.container}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <td />
                    <th>Labelled</th>
                    <th>Leading Icon</th>
                    <th>Trailing Icon</th>
                    <th>Disabled Labelled</th>
                    <th>Disabled Leading Icon</th>
                    <th>Disabled Trailing Icon</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((size) => (
                    <tr key={size}>
                      <th scope="row">{size}</th>
                      <td>
                        <Button size={size} variant={variant} shape={shape}>
                          Label text
                        </Button>
                      </td>
                      <td>
                        <Button size={size} variant={variant} shape={shape}>
                          <MaterialSymbol name="favorite" />
                          Label text
                        </Button>
                      </td>
                      <td>
                        <Button size={size} variant={variant} shape={shape}>
                          Label text
                          <MaterialSymbol name="favorite" />
                        </Button>
                      </td>
                      <td>
                        <Button
                          size={size}
                          variant={variant}
                          shape={shape}
                          disabled
                        >
                          Disabled
                        </Button>
                      </td>
                      <td>
                        <Button
                          size={size}
                          variant={variant}
                          shape={shape}
                          disabled
                        >
                          <MaterialSymbol name="favorite" />
                          Label text
                        </Button>
                      </td>
                      <td>
                        <Button
                          size={size}
                          variant={variant}
                          shape={shape}
                          disabled
                        >
                          Label text
                          <MaterialSymbol name="favorite" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr></tr>
                </tbody>
              </table>
            </div>
          </Fragment>
        ))
      )}
    </Box>
  );
}
