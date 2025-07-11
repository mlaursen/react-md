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
