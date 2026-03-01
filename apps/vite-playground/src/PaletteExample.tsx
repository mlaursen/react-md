import { Box } from "@react-md/core/box/Box";
import { css } from "@react-md/you/styles/css";
import {
  type PaletteBackgroundColor,
  type PaletteTextColor,
} from "@react-md/you/styles/palette";
import { Typography } from "@react-md/you/typography/Typography";
import { Fragment, type ReactElement } from "react";

const BACKGROUND_COLORS: PaletteBackgroundColor[] = [
  "background",
  "primary",
  "primary-container",
  "secondary",
  "secondary-container",
  "tertiary",
  "tertiary-container",
  "error",
  "error-container",
  "surface",
  "surface-variant",
  "inverse-surface",
  "inverse-primary",
  "surface-dim",
  "surface-bright",
  "surface-container-lowest",
  "surface-container-low",
  "surface-container",
  "surface-container-high",
  "surface-container-highest",
];

const TEXT_COLORS: PaletteTextColor[] = [
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

const COLOR_SCHEMES = ["light", "dark", "light dark"];

export function PaletteExample(): ReactElement {
  return (
    <>
      {COLOR_SCHEMES.map((colorScheme) => (
        <Fragment key={colorScheme}>
          <Typography>{colorScheme}</Typography>
          <Box
            key={colorScheme}
            grid
            gridItemSize="12rem"
            style={{ colorScheme }}
            className={`rmd-palette-${colorScheme.split(" ").join("-")}`}
          >
            {BACKGROUND_COLORS.map((background) => (
              <Box
                key={background}
                style={{ height: "8rem" }}
                justify="center"
                stacked
                className={css({ background })}
              >
                <Typography
                  margin="none"
                  textAlign="center"
                  textTransform="capitalize"
                >
                  {background}
                </Typography>
              </Box>
            ))}
            {TEXT_COLORS.map((textColor) => (
              <Box
                key={textColor}
                style={{
                  height: "8rem",
                }}
                justify="center"
                stacked
                className={css({ textColor })}
              >
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
        </Fragment>
      ))}
    </>
  );
}
