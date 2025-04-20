import { InlineCode } from "@react-md/code/InlineCode";
import { Box } from "@react-md/core/box/Box";
import { box } from "@react-md/core/box/styles";
import { Button } from "@react-md/core/button/Button";
import { Form } from "@react-md/core/form/Form";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

import { MarkdownCode } from "@/components/MarkdownCode.jsx";
import { MarkdownLink } from "@/components/MarkdownLink.jsx";

import styles from "./Playground.module.scss";
import { PrimaryOrSecondaryPicker } from "./PrimaryOrSecondaryPicker.jsx";
import { SimplePreview } from "./SimplePreview.jsx";
import { usePlaygroundColors } from "./usePlaygroundColors.js";

export interface PlaygroundProps {
  onReset: () => void;
}

export function Playground({
  onReset,
}: Readonly<PlaygroundProps>): ReactElement {
  const {
    style,
    reset,
    onSubmit,
    primaryColor,
    primaryColorVar,
    secondaryColor,
    secondaryColorVar,
    updateThemeValue,
  } = usePlaygroundColors();

  return (
    <>
      <Form
        style={style}
        className={box({
          grid: true,
          align: "start",
          className: styles.container,
        })}
        onSubmit={onSubmit}
        onReset={() => {
          reset();
          onReset();
        }}
      >
        <PrimaryOrSecondaryPicker
          name="primaryColor"
          value={primaryColor}
          onValueChange={(name, value) =>
            updateThemeValue({ name, value, type: "color" })
          }
        />
        <PrimaryOrSecondaryPicker
          name="secondaryColor"
          value={secondaryColor}
          onValueChange={(name, value) =>
            updateThemeValue({ name, value, type: "color" })
          }
        />
        <SimplePreview />
        <Box className={styles.footer} disablePadding>
          <Button theme="primary" themeType="contained" type="submit">
            Set Website Colors
          </Button>
          <Button theme="warning" themeType="outline" type="reset">
            Reset Colors
          </Button>
        </Box>
      </Form>
      <Typography>
        The output shown below can be copied directly into the
        <InlineCode>_everything.scss</InlineCode> file to override the theme
        colors. Only the <InlineCode>$primary-color</InlineCode> and{" "}
        <InlineCode>$secondary-color</InlineCode> variables are required as the
        rest are automatically generated using the{" "}
        <MarkdownLink href="contrast-color">$SASSDOC</MarkdownLink> Sass
        function.
      </Typography>
      <MarkdownCode fileName="src/_everything.scss" language="scss">
        {`@use "@react-md/core/a11y";
@use "@react-md/core/colors";
@use "sass:color";

@forward "@react-md/core" with (
  $primary-color: ${primaryColorVar},
  $secondary-color: ${secondaryColorVar}
);
`}
      </MarkdownCode>
    </>
  );
}
