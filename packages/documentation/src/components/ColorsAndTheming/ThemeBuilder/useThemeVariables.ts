import { useMemo } from "react";
import { HexString, getContrastRatio } from "@react-md/utils";

import {
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_SECONDARY_COLOR,
} from "components/Theme/useTheme";

type CSSVariableValue = string | number | null;
interface CSSVariable {
  name: string;
  value: CSSVariableValue;
}

function isBestColorWhite(color: HexString): boolean {
  const lightRatio = getContrastRatio(color, "#fff");
  const darkRatio = getContrastRatio(color, "#000");

  return lightRatio > darkRatio;
}

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
      if (isBestColorWhite(primaryColor)) {
        variables.push({
          name: "--rmd-theme-on-primary",
          value: "#fff",
        });
      }
    }

    if (secondaryColor) {
      if (isBestColorWhite(secondaryColor)) {
        variables.push({
          name: "--rmd-theme-on-secondary",
          value: "#fff",
        });
      }
    }

    return variables;
  }, [primaryColor, secondaryColor]);
}
