import { useMemo } from "react";
import { CSSVariable, HexString, isContrastCompliant } from "@react-md/utils";

import {
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_SECONDARY_COLOR,
} from "components/Theme/useTheme";

export default function useThemeVariables(
  primaryColor: HexString,
  secondaryColor: HexString
): CSSVariable[] {
  return useMemo(() => {
    if (
      primaryColor === DEFAULT_PRIMARY_COLOR &&
      secondaryColor === DEFAULT_SECONDARY_COLOR
    ) {
      return [];
    }

    const variables: CSSVariable[] = [
      {
        name: "--rmd-theme-primary",
        value: primaryColor,
      },
      {
        name: "--rmd-theme-secondary",
        value: secondaryColor,
      },
    ];

    if (primaryColor) {
      if (!isContrastCompliant(primaryColor, "#000")) {
        variables.push({
          name: "--rmd-theme-on-primary",
          value: "#fff",
        });
      }
    }

    if (secondaryColor) {
      if (!isContrastCompliant(secondaryColor, "#000")) {
        variables.push({
          name: "--rmd-theme-on-secondary",
          value: "#fff",
        });
      }
    }

    return variables;
  }, [primaryColor, secondaryColor]);
}
