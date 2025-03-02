import { defaultGetErrorIcon, useNumberField } from "react-md";

export function NumberFieldHookOptions(): null {
  const {
    fieldProps: numberFieldProps
  } = useNumberField({
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
