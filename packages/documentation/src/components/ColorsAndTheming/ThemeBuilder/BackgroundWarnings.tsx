import React, { FC } from "react";
import {
  HexString,
  isContrastCompliant,
  ContrastRatioCompliance,
} from "@react-md/utils";
import scssVariables from "@react-md/theme/dist/scssVariables";

import { Markdown } from "components/Markdown";

interface BackgroundWarningsProps {
  className?: string;
  primaryColor: HexString;
  secondaryColor: HexString;
  isDark: boolean;
  compliance: ContrastRatioCompliance;
}

const DARK_BG = scssVariables["rmd-theme-dark-background"];
const LIGHT_BG = scssVariables["rmd-theme-light-background"];
const DARK_TEXT_SECONDARY =
  scssVariables["rmd-theme-dark-secondary-text-color"];
const LIGHT_TEXT_SECONDARY =
  scssVariables["rmd-theme-light-secondary-text-color"];

const BackgroundWarnings: FC<BackgroundWarningsProps> = ({
  className,
  primaryColor,
  secondaryColor,
  isDark,
  compliance,
}) => {
  const warnings: string[] = [];
  const backgroundColor = isDark ? DARK_BG : LIGHT_BG;
  const textSecondary = isDark ? DARK_TEXT_SECONDARY : LIGHT_TEXT_SECONDARY;

  if (!isContrastCompliant(backgroundColor, primaryColor, compliance)) {
    warnings.push("primary color");
  }

  if (!isContrastCompliant(backgroundColor, secondaryColor, compliance)) {
    warnings.push("secondary color");
  }

  if (!isContrastCompliant(backgroundColor, textSecondary, compliance)) {
    warnings.push("secondary text color");
  }

  if (!warnings.length) {
    return null;
  }

  const isMultiplie = warnings.length > 1;
  const names = `**${warnings.join("** and **")}** value${
    isMultiplie ? "s" : ""
  } do${isMultiplie ? "" : "es"}`;

  return (
    <Markdown disableSinglePMargin className={className}>
      {`
Warning! The ${names} not meet the minimal contrast ratio against the current
background color (\`${backgroundColor}\`). This means that **any text styled
with these colors on the background will not be visible to some users**. You
can fix this by ensuring that text styled with these colors are only used as
background colors, manually update the background color to a different color,
or create a different high-contrast theme for these users.

> Note: All of the default primary colors from material design fail the "normal"
> and above compliance levels for background colors.
`}
    </Markdown>
  );
};

export default BackgroundWarnings;
