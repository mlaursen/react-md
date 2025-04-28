import { defaultGetErrorIcon, useTextField } from "react-md";

export function TextFieldHookOptions(): null {
  const {
    fieldProps: textFieldProps
  } = useTextField({
    name: "field",
    validationType: "change",
    getErrorIcon: options => {
      const {
        error,
        errorIcon,
        errorMessage
      } = options;

      if (errorMessage === "Hello") {
        return errorIcon;
      }

      return defaultGetErrorIcon({
        error,
        errorIcon,
        errorMessage
      });
    },
  });

  return null;
}
