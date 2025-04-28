import { defaultGetErrorIcon, useNumberField } from "react-md";

export function NumberFieldHookOptions(): null {
  const [, numberFieldProps] = useNumberField({
    name: "field",
    validateOnChange: true,
    getErrorIcon: (errorMessage, error, errorIcon) => {
      if (errorMessage === "Hello") {
        return errorIcon;
      }

      return defaultGetErrorIcon(errorMessage, error, errorIcon);
    },
  });

  return null;
}
