import { ColorPreview } from "@react-md/code/ColorPreview";
import { blue500 } from "@react-md/core/colors";
import { TextField, type TextFieldProps } from "@react-md/core/form/TextField";
import { useTextField } from "@react-md/core/form/useTextField";
import {
  defaultGetErrorMessage,
  defaultIsErrored,
} from "@react-md/core/form/validation";
import { cnb } from "cnbuilder";
import { type ReactElement, useEffect, useRef } from "react";

import { CSS_COLOR_REGEX, isValidColor } from "@/utils/theme.js";

import styles from "./ColorPickerTextField.module.scss";

export interface ColorPickerTextFieldProps extends TextFieldProps {
  name: string;
  color: string;
  onColorChange: (color: string) => void;
}

export function ColorPickerTextField({
  name,
  theme = "underline",
  color,
  onColorChange,
  ...props
}: Readonly<ColorPickerTextFieldProps>): ReactElement {
  const { fieldProps, value, setState } = useTextField({
    name,
    onChange: (event) => {
      const { value } = event.currentTarget;
      if (!isValidColor(value)) {
        return;
      }

      onColorChange(value);
    },
    isErrored: (options) => {
      return !isValidColor(options.value) || defaultIsErrored(options);
    },
    getErrorMessage: (options) =>
      defaultGetErrorMessage(options) ? "Invalid color format" : "",
    defaultValue: color,
    pattern: CSS_COLOR_REGEX.source,
    required: true,
  });

  const prevColor = useRef(color);
  useEffect(() => {
    const isSameColor = prevColor.current === color;
    prevColor.current = color;
    if (value === color || isSameColor) {
      return;
    }

    setState({ value: color, error: false, errorMessage: "" });
  }, [color, setState, value]);

  return (
    <TextField
      placeholder={blue500}
      {...props}
      {...fieldProps}
      theme={theme}
      className={cnb(theme !== "outline" && styles.underlined)}
      leftAddon={<ColorPreview icon color={color} />}
    />
  );
}
