import { useTheme } from "@react-md/core/theme/ThemeProvider";
import {
  type CSSVariable,
  type ConfigurableThemeColors,
} from "@react-md/core/theme/types";
import { useInlineCSSVariables } from "@react-md/core/theme/useInlineCSSVariables";
import { contrastColor } from "@react-md/core/theme/utils";
import { type CSSProperties, useCallback, useMemo, useReducer } from "react";

import { useCustomThemeContext } from "@/components/CustomTheme/useCustomThemeContext.js";
import { DEFAULT_WEBSITE_THEME_COLORS } from "@/constants/theme.js";
import { kebabCase, upperFirst } from "@/utils/strings.js";
import { getMaterialColorName } from "@/utils/theme.js";

export type SimpleThemeColor = "primaryColor" | "secondaryColor";

export interface PlaygroundColors
  extends Pick<
    ConfigurableThemeColors,
    SimpleThemeColor | `on${Capitalize<SimpleThemeColor>}`
  > {
  primaryColorVar: string;
  secondaryColorVar: string;
}

interface PlaygroundColorsAction {
  type: "color" | "var";
  name: SimpleThemeColor;
  value: string;
}

export interface PlaygroundColorsImplementation extends PlaygroundColors {
  style?: CSSProperties;
  reset: () => void;
  onSubmit: () => void;
  updateThemeValue: (action: PlaygroundColorsAction) => void;
}

const INITIAL_STATE: PlaygroundColors = {
  ...DEFAULT_WEBSITE_THEME_COLORS,
  primaryColorVar: "colors.$teal-500",
  secondaryColorVar: "colors.$pink-a-200",
};

const toSassVar = (colorName: string): string =>
  `colors.$${kebabCase(colorName.replace("Accent", "A")).replace(/([a-z])(\d)/, "$1-$2")}`;

const isOverridableColor = (
  key: string
): key is keyof ConfigurableThemeColors => key in DEFAULT_WEBSITE_THEME_COLORS;

export function usePlaygroundColors(): PlaygroundColorsImplementation {
  const currentTheme = useTheme();
  const { setOverrides } = useCustomThemeContext();

  const [state, dispatch] = useReducer(
    function reducer(
      state: PlaygroundColors,
      action: PlaygroundColorsAction | { type: "reset" }
    ): PlaygroundColors {
      switch (action.type) {
        case "reset":
          return INITIAL_STATE;
        case "var": {
          const { name, value } = action;
          return {
            ...state,
            [`${name}Var`]: value,
          };
        }
        case "color": {
          const { name, value } = action;
          const varKey = `${name}Var` as const;
          const onVarKey = `on${upperFirst(name)}` as const;
          const colorName = getMaterialColorName(value);
          const varValue = colorName ? toSassVar(colorName) : state[varKey];
          let onColor = state[onVarKey];
          try {
            onColor = contrastColor(value);
          } catch {
            // TODO: Show warning about this and allow manual config
          }
          return {
            ...state,
            [name]: value,
            [onVarKey]: onColor,
            [varKey]: varValue,
          };
        }
        default:
          return state;
      }
    },
    INITIAL_STATE,
    (init) => {
      const { primaryColor, secondaryColor, onPrimaryColor, onSecondaryColor } =
        currentTheme;

      const primaryColorVar = getMaterialColorName(primaryColor);
      const secondaryColorVar = getMaterialColorName(secondaryColor);
      return {
        ...init,
        primaryColor,
        onPrimaryColor,
        primaryColorVar: primaryColorVar
          ? toSassVar(primaryColorVar)
          : init.primaryColorVar,
        secondaryColor,
        onSecondaryColor,
        secondaryColorVar: secondaryColorVar
          ? toSassVar(secondaryColorVar)
          : init.secondaryColorVar,
      };
    }
  );

  const reset = useCallback(() => {
    setOverrides({});
    dispatch({ type: "reset" });
  }, [setOverrides]);
  const onSubmit = useCallback(() => {
    const overrides: Partial<ConfigurableThemeColors> = {};
    Object.entries(state).forEach(([key, value]) => {
      if (!isOverridableColor(key)) {
        return;
      }

      overrides[key] = value;
    });
    setOverrides(overrides);
  }, [setOverrides, state]);

  const style = useInlineCSSVariables(
    useMemo(() => {
      const variables: CSSVariable[] = [];
      Object.entries(state).forEach(([key, value]) => {
        if (!isOverridableColor(key)) {
          return;
        }

        const name = `--rmd-${kebabCase(key)}` as const;
        variables.push({ name, value });
      });
      return variables;
    }, [state])
  );

  return {
    ...state,
    style,
    reset,
    onSubmit,
    updateThemeValue: dispatch,
  };
}
