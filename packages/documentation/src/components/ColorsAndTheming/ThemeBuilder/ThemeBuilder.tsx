import { ReactElement } from "react";
import { Grid } from "@react-md/utils";
import scssVariables from "@react-md/theme/dist/scssVariables";

import { useTheme } from "components/Theme";

import ThemeConfiguration from "./ThemeConfiguration";
import Preview from "./Preview";
import ThemeUsage from "./ThemeUsage";

import styles from "./ThemeBuilder.module.scss";

export default function ThemeBuilder(): ReactElement {
  const { primary, secondary, accent, theme } = useTheme();
  const primaryName = `rmd-${primary}-500` as "rmd-teal-500";
  const primaryColor = scssVariables[primaryName];
  const secondaryName = `rmd-${secondary}-a-${accent}` as "rmd-pink-a-200";
  const secondaryColor = scssVariables[secondaryName];

  return (
    <Grid desktopColumns={2} columns={1} className={styles.container}>
      <ThemeConfiguration
        primary={primary}
        secondary={secondary}
        accent={accent}
        theme={theme}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <Preview />
      <ThemeUsage
        primary={primary}
        secondary={secondary}
        accent={accent}
        theme={theme}
      />
    </Grid>
  );
}
