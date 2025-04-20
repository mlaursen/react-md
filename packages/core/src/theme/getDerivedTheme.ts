import {
  backgroundColorVar,
  errorColorVar,
  onErrorColorVar,
  onPrimaryColorVar,
  onSecondaryColorVar,
  onSuccessColorVar,
  onWarningColorVar,
  primaryColorVar,
  secondaryColorVar,
  successColorVar,
  textDisabledColorVar,
  textHintColorVar,
  textPrimaryColorVar,
  textSecondaryColorVar,
  warningColorVar,
} from "./cssVars.js";
import { type ConfigurableThemeColors } from "./types.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-background-color"?: string;
    "--rmd-on-background-color"?: string;
    "--rmd-surface-color"?: string;
    "--rmd-primary-color"?: string;
    "--rmd-on-primary-color"?: string;
    "--rmd-secondary-color"?: string;
    "--rmd-on-secondary-color"?: string;
    "--rmd-warning-color"?: string;
    "--rmd-on-warning-color"?: string;
    "--rmd-error-color"?: string;
    "--rmd-on-error-color"?: string;
    "--rmd-success-color"?: string;
    "--rmd-on-success-color"?: string;
    "--rmd-text-primary-color"?: string;
    "--rmd-text-secondary-color"?: string;
    "--rmd-text-hint-color"?: string;
    "--rmd-text-disabled-color"?: string;

    "--rmd-outline-width"?: string | number;
    "--rmd-outline-color"?: string;
    "--rmd-outline-grey-color"?: string;
  }
}

/** @since 6.0.0 */
export const getDerivedTheme = (
  container: Element = document.documentElement
): Readonly<ConfigurableThemeColors> => {
  const rootStyles = window.getComputedStyle(container);
  const backgroundColor = rootStyles.getPropertyValue(backgroundColorVar);
  const primaryColor = rootStyles.getPropertyValue(primaryColorVar);
  const onPrimaryColor = rootStyles.getPropertyValue(onPrimaryColorVar);
  const secondaryColor = rootStyles.getPropertyValue(secondaryColorVar);
  const onSecondaryColor = rootStyles.getPropertyValue(onSecondaryColorVar);
  const warningColor = rootStyles.getPropertyValue(warningColorVar);
  const onWarningColor = rootStyles.getPropertyValue(onWarningColorVar);
  const errorColor = rootStyles.getPropertyValue(errorColorVar);
  const onErrorColor = rootStyles.getPropertyValue(onErrorColorVar);
  const successColor = rootStyles.getPropertyValue(successColorVar);
  const onSuccessColor = rootStyles.getPropertyValue(onSuccessColorVar);
  const textPrimaryColor = rootStyles.getPropertyValue(textPrimaryColorVar);
  const textSecondaryColor = rootStyles.getPropertyValue(textSecondaryColorVar);
  const textHintColor = rootStyles.getPropertyValue(textHintColorVar);
  const textDisabledColor = rootStyles.getPropertyValue(textDisabledColorVar);

  return {
    backgroundColor,
    primaryColor,
    onPrimaryColor,
    secondaryColor,
    onSecondaryColor,
    warningColor,
    onWarningColor,
    errorColor,
    onErrorColor,
    successColor,
    onSuccessColor,
    textPrimaryColor,
    textSecondaryColor,
    textHintColor,
    textDisabledColor,
  };
};
