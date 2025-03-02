import { defaultGetErrorIcon, useTextField } from "react-md";

export function TextFieldHookOptions(): null {
  const [, textFieldProps] = useTextField({
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
