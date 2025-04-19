import { InlineCode } from "@react-md/code/InlineCode";
import { box } from "@react-md/core/box/styles";
import { Button } from "@react-md/core/button/Button";
import { Form } from "@react-md/core/form/Form";
import { type CSSVariable } from "@react-md/core/theme/types";
import { useCSSVariables } from "@react-md/core/theme/useCSSVariables";
import { contrastColor } from "@react-md/core/theme/utils";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement, useMemo, useState } from "react";

import { MarkdownCode } from "@/components/MarkdownCode.jsx";
import { MarkdownLink } from "@/components/MarkdownLink.jsx";
import { DEFAULT_WEBSITE_THEME_COLORS } from "@/constants/theme.js";

import styles from "./Playground.module.scss";
import { PrimaryOrSecondaryPicker } from "./PrimaryOrSecondaryPicker.jsx";
import { SimplePreview } from "./SimplePreview.jsx";

export interface PlaygroundProps {
  onReset: () => void;
}

export function Playground({
  onReset,
}: Readonly<PlaygroundProps>): ReactElement {
  const [primaryColor, setPrimaryColor] = useState(
    DEFAULT_WEBSITE_THEME_COLORS.primaryColor
  );
  const [primaryColorVar, setPrimaryColorVar] = useState("colors.$teal-500");
  const [secondaryColor, setSecondaryColor] = useState(
    DEFAULT_WEBSITE_THEME_COLORS.secondaryColor
  );
  const [secondaryColorVar, setSecondaryColorVar] =
    useState("colors.$pink-a-200");
  const style = useCSSVariables(
    useMemo(() => {
      const variables: CSSVariable[] = [
        {
          name: "--rmd-primary-color",
          value: primaryColor,
        },
        {
          name: "--rmd-secondary-color",
          value: secondaryColor,
        },
      ];
      try {
        variables.push({
          name: "--rmd-on-primary-color",
          value: contrastColor(primaryColor),
        });
      } catch {
        // fail silently
      }
      try {
        variables.push({
          name: "--rmd-on-secondary-color",
          value: contrastColor(secondaryColor),
        });
      } catch {
        // fail silently
      }

      return variables;
    }, [primaryColor, secondaryColor]),
    true
  );

  return (
    <>
      <Form
        style={style}
        className={box({
          grid: true,
          align: "start",
          className: styles.container,
        })}
        onReset={onReset}
      >
        <PrimaryOrSecondaryPicker
          name="primaryColor"
          value={primaryColor}
          onValueChange={setPrimaryColor}
          onMaterialColorChange={setPrimaryColorVar}
        />
        <PrimaryOrSecondaryPicker
          name="secondaryColor"
          value={secondaryColor}
          onValueChange={setSecondaryColor}
          onMaterialColorChange={setSecondaryColorVar}
        />
        <SimplePreview />
        <div className={styles.footer}>
          <Button theme="warning" themeType="outline" type="reset">
            Reset Colors
          </Button>
        </div>
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
